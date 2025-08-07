<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DetailsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
Route::get('/', function () {
return Inertia::render('welcome');
})->name('home');
// dd('code ended 1');
Route::get('/details', [DetailsController::class, 'create'])->name('details');
Route::post('/details.store', [DetailsController::class, 'store'])->name('details.store');
    // dd('code ended 1');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';