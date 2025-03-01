<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function update(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'display_name' => 'nullable|string|max:255',
                'social_url' => 'nullable|active_url|max:255',
                'profile_picture' => 'nullable|image',
            ]
        );


        if ($validator->fails()) {
            return to_route("user.settings.profile")->withErrors($validator);
        }
        $validated = $validator->validated();

        $profile = $request->user()->profile;

        if ($validated['display_name']) {
            $profile->display_name = $validated['display_name'];
        }
        if ($validated['social_url']) {
            $profile->social_url = $validated['social_url'];
        }
        if ($validated['profile_picture']) {
            $newURL = Storage::putFile("/public", $validated["profile_picture"]);
            if ($profile->profile_picture) {
                Storage::delete($profile->profile_picture);
            }
            $profile->profile_picture = Storage::path($newURL);
            $profile->save();
        }
        $profile->save();

        to_route('user.settings.profile');
    }

    public function edit(Request $request)
    {
        return Inertia::render(
            "User/Settings/Profile",
        );
    }
}
