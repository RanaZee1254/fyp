<?php
use App\Http\Controllers\Auth\ParentsLoginController;
use App\Http\Controllers\Auth\SchoolLoginController;
use App\Http\Controllers\Auth\ShopkeeperLoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'role:school'])->group(function () {
    Route::get('/school/register', fn () => Inertia::render('School/Register'))->name('school.register');
});

Route::middleware(['auth', 'role:shopkeeper'])->group(function () {
    Route::get('/shopkeeper/dashboard', fn () => Inertia::render('Shopkeeper/Dashboard'))->name('shopkeeper.dashboard');
});

Route::middleware(['auth', 'role:parent'])->group(function () {
    Route::get('/parents/dashboard', fn () => Inertia::render('Parents/Dashboard'))->name('parents.dashboard');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
