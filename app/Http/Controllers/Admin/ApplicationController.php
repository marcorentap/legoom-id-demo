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
        $apps = Client::all()->select('id', 'name', 'secret', 'redirect');
        return Inertia::render("Admin/Applications", [
            'apps' => $apps,
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
                'redirect' => 'url|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        Client::create([
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'redirect' => $validated['redirect'],
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
    public function update(Request $request, string $id): RedirectResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'update_name' => 'string|max:255|nullable',
                'update_redirect' => 'url|max:255|nullable',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        $client = Client::find($id);
        if ($validated['update_name']) {
            $client->name = $validated['update_name'];
        }
        if ($validated['update_redirect']) {
            $client->redirect = $validated['update_redirect'];
        }
        $client->save();

        return to_route("admin.applications");
    }

    /**
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $client = Client::find($id);
        if ($client) {
            $client->delete();
        }
        return to_route('admin.applications');
    }
}
