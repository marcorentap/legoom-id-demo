<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Passport::tokensCan([
            'read-profile' => 'Read profile information',
            'read-account' => 'Read account information',
        ]);
        // If enabled, plain-text secret is only visible once
        // Passport::hashClientSecrets();
    }
}
