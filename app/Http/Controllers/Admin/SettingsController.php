<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use stdClass;

class SettingsController extends Controller
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
        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        $profilePicture = $request->user()->profile->profile_picture;
        return Inertia::render("Admin/Settings", [
            'organization_name' => $settings['name'],
            'organization_logo' => Storage::url($settings['logo']),
            'profile_picture' => $profilePicture ? Storage::url($profilePicture) : null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validator  = Validator::make(
            $request->all(),
            [
                'organization_name' => 'nullable|string',
                'organization_logo' => 'nullable|image',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.settings")->withErrors($validator);
        }

        $validated = $validator->validated();

        // Update organization name
        if (array_key_exists("organization_name", $validated)) {
            if ($validated['organization_name']) {
                $new = PlatformSettings::create([
                    "key" => "name",
                    "value" => $validated["organization_name"],
                ]);
                $new->save();
            }
        }

        // Update organization logo
        if (array_key_exists("organization_logo", $validated)) {
            if ($validated['organization_logo']) {
                $entry = PlatformSettings::where('key', 'logo')->first();
                $currentPath = $entry->value;

                $newURL = Storage::putFile("/public", $validated["organization_logo"]);
                $newPath = Storage::path($newURL);

                $entry->value = Storage::path($newURL);
                Storage::delete($currentPath);
                $entry->save();
                Log::info("Saved organization logo to " . $newPath);
            }
        }

        return redirect(route('admin.settings'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
