<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Models\PlatformSettings;
use App\Models\UserMembership;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class MembershipController extends Controller
{
    /**
     * @return Response
     */
    public function edit(Request $request): Response {
        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        $profilePicture = $request->user()->profile->getCanonicalProfilePicture();
        $memberships = Membership::all()->select(['id','name']);

        return Inertia::render("Admin/Membership", [
            'memberships' => $memberships,
        ]);
    }
    /**
     * @return RedirectResponse
     */
    public function create(Request $request): RedirectResponse{
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'string|max:255',
                'callback' => 'url|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.membership")->withErrors($validator);
        }
        $validated = $validator->validated();
        Membership::create([
            'name' => $validated['name']
        ]);
        return to_route('admin.membership');
    }

    public function update(Request $request, string $id): RedirectResponse {
        $validator = Validator::make(
            $request->all(),
            [
                'update_name' => 'string|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.membership")->withErrors($validator);
        }
        $validated = $validator->validated();
        $memb = Membership::find($id);
        $memb->name = $validated['update_name'];
        $memb->save();

        return to_route("admin.membership");
    }

    /**
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $id): RedirectResponse{
        $memb = Membership::find($id);
        $userMemb = UserMembership::where('membership_id', $memb->id)->first();

        if ($userMemb) {
            return to_route('admin.membership')->withErrors(['delete' => 'Membership still in use']);
        }

        if ($memb) {
            $memb->delete();
        }
        return to_route('admin.membership');
    }
}
