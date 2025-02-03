<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class AccountController extends Controller
{
    /**
     * Update the user's account information.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'email' => ['string', 'max:255', 'email:dns,strict', 'unique:' . User::class],
            'password' => ['max:255', 'min:8', 'confirmed', Rules\Password::defaults()]
        ]);

        $user = $request->user();
        $user->fill($validated);
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
