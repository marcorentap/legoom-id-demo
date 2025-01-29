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

        return Inertia::render('Settings', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'displayName' => 'Display Name',
                'socialUrl' => 'http://example.com',
                'membership' => 'Insider',
                'paymentCard' => 'VISA *1337',
                'avatar' => 'https://catsoftheweb.com/wp-content/uploads/2024/09/panko.jpg'
            ],
        ]);
    }
}
