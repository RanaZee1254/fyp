<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
// Route::middleware('auth')->get('/dashboard', [UserController::class, 'Dashboard'])->name('dashboard');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';