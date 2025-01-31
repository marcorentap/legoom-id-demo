<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->profile;

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
                'avatar' => 'https://catsoftheweb.com/wp-content/uploads/2024/09/panko.jpg'
                // 'avatar' => $profile->avatar,
            ]
        ]);
    }
}
