<?php

namespace App\Http\Middleware;

use App\Models\PlatformSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $profile = $user ? $user->profile : null;
        $membership = $user ? $user->membership : null;
        $settings = PlatformSettings::pluck('value', 'key');

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'user' => [
                'account' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'role' => $user->role,
                ] : null,
                'profile' => $profile ? [
                    'display_name' => $profile->display_name,
                    'profile_picture' => $profile->getCanonicalProfilePicture(),
                    'social_url' => $profile->social_url,
                ] : null,
                'membership' => $membership ? [
                    'id' => $membership->id,
                    'name' => $membership->name,
                ] : null,
            ],
            'settings' => [
                'name' => PlatformSettings::getOrganizationName(),
                'logo' => PlatformSettings::getCanonicalOrganizationLogo(),
            ]
        ];
    }
}
