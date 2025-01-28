<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function account(Request $request): Response {
        $user = $request->user();

        return Inertia::render('Settings/Account', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'displayName' => 'Display Name',
                'socialUrl' => 'http://example.com'
            ]
        ]);
    }
}
