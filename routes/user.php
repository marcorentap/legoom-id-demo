<?php

use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/settings', function (Request $request) {
    return redirect(route('user.settings.account'));
})->middleware(['auth', 'verified'])->name('user.settings');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/settings/account', [AccountController::class, 'edit'])->name('user.settings.account');
    Route::post('/settings/account/info', [AccountController::class, 'updateInfo'])->name('user.settings.account.info');
    Route::post('/settings/account/password', [AccountController::class, 'updatePassword'])->name('user.settings.account.password');

    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('user.settings.profile');
    Route::post('/settings/profile', [ProfileController::class, 'update'])->name('user.settings.profile');
});
