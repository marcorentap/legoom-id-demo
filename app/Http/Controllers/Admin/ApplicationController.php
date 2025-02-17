<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function edit(Request $request)
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

    public function create(Request $request)
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
}
