<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
return Inertia::render('welcome');
})->name('home');

// dd('web.php is loaded');

Route::get('/details', [DetailsController::class, 'index'])->name('details');
Route::resource('/details', DetailsController::class)->except(['show']);
Route::post('/details', [DetailsController::class, 'store'])->name('details.store');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';