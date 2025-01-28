<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PassportOverride\AuthorizationController;
use App\Http\Controllers\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $user = $request->user();
    if ($user) {
        return Inertia::render('Homepage', [
            "user_id" => $user->id,
            "user_name" => $user->name
        ]);
    }

    return Inertia::render('GuestHomepage');
})->name("homepage");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/oauth/authorize',
    [AuthorizationController::class, 'authorize']
);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingsController::class, 'account'])->name('settings');
});

require __DIR__ . '/auth.php';
