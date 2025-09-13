<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin-dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin-dashboard');

    Route::get('/admin/user-management', [UserController::class, 'index'])->name('admin.user-management');
    Route::post('/admin/user-management/store', [UserController::class, 'store'])->name('admin.user-management.store');
    Route::put('/admin/user-management/update/{user}', [UserController::class, 'update'])->name('admin.user-management.update');
    Route::put('/admin/user-management/reset-password/{user}', [UserController::class, 'resetPassword'])->name('admin.user-management.reset-password');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
