<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware('auth')->match(['get', 'post'], '/dashboard', function (Request $request) {
    $user = Auth::user();
    if (!$user) {
        return redirect()->route('login');
    }
    else if ($user instanceof \Illuminate\Database\Eloquent\Model) {
        $user->load(['schoolProfile', 'shopProfile']);
    }
    return view('Dashboard', [
        'user' => $user,
    ]);
})->name('dashboard');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';