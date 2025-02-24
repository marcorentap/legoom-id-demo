<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        $profile = $request->user()->profile;
        $profile_picture = $profile->profile_picture;
        return Inertia::render("User/Settings/Account", [
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_picture' => $profile_picture ? Storage::url($profile->profile_picture) : null,
            'organization_name' => $settings['name'],
            'organization_logo' => Storage::url($settings['logo'])
        ]);
        return Inertia::render("User/Settings/Account");
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateInfo(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'nullable|string|max:255',
                'email' => 'nullable|string|lowercase|email|max:255|unique:' . User::class,
            ]
        );
        if ($validator->fails()) {
            return to_route("user.settings.account")->withErrors($validator);
        }
        $validated = $validator->validated();

        $user = $request->user();
        if ($validated['name']) {
            $user->name = $validated['name'];
        }
        if ($validated['email']) {

            $user->email = $validated['email'];
        }
        $user->save();

        return to_route('user.settings.account');
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'password' => ['max:255', 'min:8', 'confirmed', Rules\Password::defaults()],
                'current_password' => ['current_password']
            ],
            ['current_password' => 'Current password is incorrect']
        );

        if ($validator->fails()) {
            return to_route("user.settings.account")->withErrors($validator);
        }

        $validated = $validator->validated();
        $user = $request->user();
        $user->password = $validated['password'];
        $user->save();

        return to_route('user.settings.account');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
