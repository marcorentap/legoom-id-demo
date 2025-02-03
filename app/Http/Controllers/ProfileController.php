<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'display_name' => 'string|max:255',
            'social_url' => 'url:http,https'
        ]);

        if ($validator->fails()) {
            return to_route("settings")->withErrors($validator);
        }

        $validated = $validator->validated();

        if ($request->has('name')) {
            $request->user()->name = $validated['name'];
            $request->user()->save();
        }

        $profile = $request->user()->profile;
        $profile->fill($validated);
        $profile->save();
        return to_route("settings");
    }

    public function upload_picture(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        $validator = Validator::make(
            $request->all(),
            ['avatar_file' => 'required|image'],
            ['avatar_file' => 'No file selected.']
        );
        if ($validator->fails()) {
            return to_route("settings")->withErrors($validator);
        }


        $validated = $validator->validated();
        $file = $validated['avatar_file'];

        $cur_avatar = $profile->avatar;
        if ($cur_avatar && Storage::exists($cur_avatar)) {
            Storage::delete($cur_avatar);
        }

        if (!Storage::directoryExists('profile-pictures')) {
            Storage::makeDirectory('profile-pictures');
        }

        $avatar = $file->storePublicly('profile-pictures', 's3');
        if ($avatar) {
            $profile->avatar = $avatar;
            $profile->save();
        } else {
            error_log("Cannot store profile picture");
        }

        return to_route("settings");
    }
}
