<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PassportOverride\AuthorizationController;
use App\Http\Controllers\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $user = $request->user();
    if ($user) {
        $profile = $user->profile;
        return Inertia::render('Homepage', [
            'account' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => [
                'displayName' => $profile->display_name,
                'socialUrl' => $profile->social_url,
                'avatar' => $profile->avatar,
                'membership' => $profile->membership->name
            ]
        ]);
    }

    return Inertia::render('GuestHomepage');
})->name("homepage");

Route::get('/dashboard', function () {
    return to_route("homepage");
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get(
    '/oauth/authorize',
    [AuthorizationController::class, 'authorize']
);

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingsController::class, 'show'])->name('settings');

    Route::patch('/account', [AccountController::class, 'update'])->name('account.update');
    Route::delete('/account', [AccountController::class, 'destroy'])->name('account.delete');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/picture', [ProfileController::class, 'upload_picture'])->name('profile.picture');
});

require __DIR__ . '/auth.php';
