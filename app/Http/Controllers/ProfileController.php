<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $profile = $request->user()->profile;
        $profile->fill($request->input());
        $profile->save();

        if ($request->has('name')) {
            $request->user()->name = $request->input('name');
            $request->user()->save();
        }

        return to_route("settings");
    }
}
