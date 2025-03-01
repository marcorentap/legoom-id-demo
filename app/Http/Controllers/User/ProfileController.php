<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Models\PlatformSettings;
use App\Models\Profile;
use App\Models\User;
use App\Models\UserMembership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $user = $request->user();
        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        $profile = $request->user()->profile;

        // Only one membership for now
        $memberships = UserMembership::where('user_id', $user->id)->get()->all();
        $membership = Membership::find($memberships[0]->membership_id)->name;

        $profile_picture = $profile->profile_picture;

        return Inertia::render("User/Settings/Profile", [
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'display_name' => $profile->display_name,
            'social_url' => $profile->social_url,
            'profile_picture' => $profile_picture ? Storage::url($profile->profile_picture) : null,
            'organization_name' => PlatformSettings::getOrganizationName(),
            'organization_logo' => PlatformSettings::getCanonicalOrganizationLogo(),
            'membership' => $membership
        ]);
    }
}
