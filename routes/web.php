<?php
use App\Http\Controllers\Auth\ParentsLoginController;
use App\Http\Controllers\Auth\SchoolLoginController;
use App\Http\Controllers\Auth\ShopkeeperLoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'role:school'])->group(function () {
    Route::get('/school/dashboard', fn () => Inertia::render('School/Dashboard'))->name('school.register');
});

Route::middleware(['auth', 'role:shopkeeper'])->group(function () {
    Route::get('/shopkeeper/dashboard', fn () => Inertia::render('Shopkeeper/Dashboard'))->name('shopkeeper.dashboard');
});

Route::middleware(['auth', 'role:parent'])->group(function () {
    Route::get('/parents/dashboard', fn () => Inertia::render('Parents/Dashboard'))->name('parents.dashboard');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
