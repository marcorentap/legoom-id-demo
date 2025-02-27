<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    /**
     * @return Response
     */
    public function edit(Request $request): Response
    {
        $apps = Client::select(
            ['id as app_id', 'name as app_name', 'secret as app_secret', 'redirect as app_callback']
        )
            ->get();
        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        $profilePicture = $request->user()->profile->profile_picture;
        return Inertia::render("Admin/Applications", [
            'apps' => $apps,
            'organization_name' => $settings['name'],
            'organization_logo' => Storage::url($settings['logo']),
            'profile_picture' => $profilePicture ? Storage::url($profilePicture) : null,
        ]);
    }
    /**
     * @return RedirectResponse
     */
    public function create(Request $request): RedirectResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'string|max:255',
                'callback' => 'url|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        Client::create([
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'redirect' => $validated['callback'],
            'secret' => Str::random(40),
            'personal_access_client' => false,
            'password_client' => false,
            'revoked' => false
        ]);

        return to_route('admin.applications');
    }
    /**
     * @return RedirectResponse
     */
    public function update(Request $request, string $id): RedirectResponse {
        $validator = Validator::make(
            $request->all(),
            [
                'update_name' => 'string|max:255',
                'update_callback' => 'url|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        $client = Client::find($id);
        $client->name = $validated['update_name'];
        $client->redirect = $validated['update_callback'];
        $client->save();

        return to_route("admin.applications");
    }

    /**
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse {
        $client = Client::find($id);
        if ($client) {
            $client->delete();
        }
        return to_route('admin.applications');
    }
}
