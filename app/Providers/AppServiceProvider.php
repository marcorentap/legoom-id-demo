<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
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
            'read-personal-info' => 'Read personal information',
            'write-personal-info' => 'Read and modify personal information',
            'read-membership-info' => 'Read membership information',
            'write-membership -info' => 'Read and modify personal information',
        ]);
    }
}
