<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->profile;

        return Inertia::render('Settings', [
            'account' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => [
                'displayName' => $profile->display_name,
                'socialUrl' => $profile->social_url,
                'avatar' => $profile->avatar,
                'membership' => $profile->membership->name
            ]
        ]);
    }
}
