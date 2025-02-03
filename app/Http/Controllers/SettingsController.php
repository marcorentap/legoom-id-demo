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
        $avatar = $profile->avatar;

        return Inertia::render('Settings', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'membership' => 'Insider',
                'paymentCard' => 'VISA *1337',
            ],
            'profile' => [
                'displayName' => $profile->display_name,
                'socialUrl' => $profile->social_url,
                'avatar' => $avatar
            ]
        ]);
    }
}
