<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Passport\Client;

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
}
