<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
        $users = DB::table('user_memberships')
            ->leftJoin('users', 'user_id', '=', 'users.id')
            ->leftJoin('memberships', 'membership_id', '=', 'memberships.id')
            ->where('users.role', '=', 'user')
            ->select(
                'users.name as name',
                'users.email as email',
                'users.email_verified_at as email_verified_at',
                'memberships.name as membership',
            )
            ->get();
        $settings = PlatformSettings::pluck('value', 'key')->toArray();

        Log::info($request->user()->profile->getCanonicalProfilePicture());
        return Inertia::render("Admin/Users", [
            'users' => $users,
            'organization_name' => $settings['name'],
            'organization_logo' => Storage::url($settings['logo']),
            'profile_picture' => $request->user()->profile->getCanonicalProfilePicture(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
