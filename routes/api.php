<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    $user = $request->user();
    $profile = $user ? $user->profile : null;
    $membership = $user ? $user->memberships->first() : null;
    return [
        'user' => [
            'account' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'role' => $user->role,
            ] : null,
            'profile' => $profile ? [
                'display_name' => $profile->display_name,
                'profile_picture' => $profile->getCanonicalProfilePicture(),
                'social_url' => $profile->social_url,
            ] : null,
            'membership' => $membership ? [
                'id' => $membership->id,
                'name' => $membership->name,
            ] : null,
        ],

    ];
})->middleware('auth:api');
