<?php

use App\Models\Membership;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

function userResponse(User $user)
{
    $profile = $user ? $user->profile : null;
    $membership = $user ? $user->membership : null;
    return [
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
    ];
}

Route::get('/user', function (Request $request) {
    $user = $request->user();
    return userResponse($user);
})->middleware(['auth:api', 'scope:read-account']);

Route::post('/user/membership/', function (Request $request) {
    $validator = Validator::make(
        $request->all(),
        [
            'id' => 'required|integer|exists:memberships',
        ]
    );
    if ($validator->fails()) {
        return response(['message' => $validator->errors()], 400);
    }
    $validated = $validator->validated();
    $membership = Membership::find($validated['id']);
    $user = $request->user();
    $user->membership_id = $membership->id;
    $user->save();
    return userResponse($user);
})->middleware(['auth:api', 'scope:edit-membership']);
