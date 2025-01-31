<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Update the user's account information.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $user->fill($request->input());
        $user->save();

        return to_route("settings");
    }

    /**
     * Delete the user's account
     */
    public function destroy(Request $request)
    {

        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route("homepage");
    }
}
