<?php

use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\MembershipController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SettingsController;

Route::get('/admin/dashboard', function (Request $request) {
    return redirect(route('admin.users'));
})->middleware(['auth', 'verified', EnsureUserIsAdmin::class])->name('admin.dashboard');

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::get('/admin/users', [UserController::class, 'edit'])->name('admin.users');

    Route::get('/admin/membership', [MembershipController::class, 'edit'])->name('admin.membership');
    Route::post('/admin/membership', [MembershipController::class, 'create'])->name('admin.membership');

    Route::get('/admin/applications', [ApplicationController::class, 'edit'])->name('admin.applications');
    Route::post('/admin/applications', [ApplicationController::class, 'create'])->name('admin.applications.create');
    Route::post('/admin/applications/{id}', [ApplicationController::class, 'update'])->name('admin.applications.update');
    Route::delete('/admin/applications/{id}', [ApplicationController::class, 'destroy'])->name('admin.applications.destroy');

    Route::get('/admin/settings', [SettingsController::class, 'edit'])->name('admin.settings');
    Route::post('/admin/settings', [SettingsController::class, 'update'])->name('admin.settings.update');
});
