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
    Route::get('/admin/user-management/create', [UserController::class, 'create'])->name('admin.user-management.create');
    Route::post('/admin/user-management/store', [UserController::class, 'store'])->name('admin.user-management.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
