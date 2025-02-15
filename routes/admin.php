<?php

use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SettingsController;

Route::get('/admin/dashboard', function (Request $request) {
    return redirect(route('admin.users'));
})->middleware(['auth', 'verified', EnsureUserIsAdmin::class])->name('admin.dashboard');

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    // Route::get('/admin/dashboard', redirect(route('admin.users')))->name('admin.dashboard');
    Route::get('/admin/users', [UserController::class, 'edit'])->name('admin.users');
    // Route::get('/admin/applications', redirect(route('admin.users')))->name('admin.dashboard');
});

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    // Route::get('/admin/dashboard', redirect(route('admin.users')))->name('admin.dashboard');
    Route::get('/admin/settings', [SettingsController::class, 'edit'])->name('admin.settings');
    Route::post('/admin/settings', [SettingsController::class, 'update'])->name('admin.settings.update');
    // Route::get('/admin/applications', redirect(route('admin.users')))->name('admin.dashboard');
});
