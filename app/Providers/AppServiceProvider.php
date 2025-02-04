<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Passport\Passport;
use App\Http\Controllers\PassportOverride\AuthorizationController;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when(AuthorizationController::class)
            ->needs(StatefulGuard::class)
            ->give(fn() => Auth::guard(config('passport.guard', null)));
        // Passport::ignoreRoutes('/oauth/authorize');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Passport::tokensCan([
            'read-profile' => 'Read profile information',
            'write-profile' => 'Read and modify profile information',
            'read-account' => 'Read account information',
            'write-account' => 'Read and modify account information',
        ]);
    }
}
