<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $inputs = $request->input();

        if ($request->has('name')) {
            $request->user()->name = $inputs['name'];
            $request->user()->save();
        }

        $profile = $request->user()->profile;
        $profile->fill($inputs);
        $profile->save();

        return to_route("settings");
    }

    public function upload_picture(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;
        $cur_avatar = $profile->avatar;
        if ($cur_avatar && Storage::exists($cur_avatar)) {
            Storage::delete($cur_avatar);
        }

        $file = $request->file('avatar_file');
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
