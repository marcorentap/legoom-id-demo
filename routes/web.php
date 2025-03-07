<?php

use App\Http\Controllers\PassportOverride\AuthorizationController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    if ($request->user()->role == 'admin') {
        return redirect(route('admin.dashboard'));
    } else {
        return redirect(route('user.settings'));
        // return Inertia::render('Dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/invalid', function () {
    return 'Invalid request';
});

Route::get(
    '/oauth/authorize',
    [AuthorizationController::class, 'authorize']
);



require __DIR__ . '/admin.php';

require __DIR__ . '/user.php';

require __DIR__ . '/auth.php';
