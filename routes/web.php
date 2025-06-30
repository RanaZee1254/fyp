<?php

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
Route::get('/schools/{school}', function ($school) {
    $data = [
        'allied' => [
            'name' => 'Allied School',
            'campuses' => ['Boys Campus', 'Girls Campus'],
            'fees' => [
                'Boys Campus' => 'PKR 20,000/year',
                'Girls Campus' => 'PKR 18,000/year',
            ],
            'address' => '123 Allied St, City',
            'contact' => [
                'phone' => '123-456-7890',
                'email' => 'info@alliedschool.edu',
            ],
            'established' => 1990,
        ],
        'smart' => [
            'name' => 'The Smart School',
            'campuses' => ['Boys Campus', 'Girls Campus'],
            'fees' => [
                'Boys Campus' => 'PKR 22,000/year',
                'Girls Campus' => 'PKR 20,000/year',
            ],
            'address' => '456 Smart Ave, City',
            'contact' => [
                'phone' => '234-567-8901',
                'email' => 'contact@smartschool.edu',
            ],
            'established' => 1995,
        ],
        'Govt' => [
            'name' => 'Govt School',
            'campuses' => ['Boys Campus', 'Girls Campus'],
            'fees' => [
                'Boys Campus' => 'Free',
                'Girls Campus' => 'Free',
            ],
            'address' => '789 Govt Rd, City',
            'contact' => [
                'phone' => '345-678-9012',
                'email' => 'info@govtschool.edu',
            ],
            'established' => 1995,
        ],
        'Shaheen' => [
            'name' => 'Shaheen School',
            'campuses' => ['Boys Campus', 'Girls Campus'],
            'fees' => [
                'Boys Campus' => 'PKR 18,000/year',
                'Girls Campus' => 'PKR 17,000/year',
            ],
            'address' => '321 Shaheen Blvd, City',
            'contact' => [
                'phone' => '456-789-0123',
                'email' => 'info@shaheenschool.edu',
            ],
            'established' => 2000,
        ],
        'Educators' => [
            'name' => 'Educators School',
            'campuses' => ['Boys Campus', 'Girls Campus'],
            'fees' => [
                'Boys Campus' => 'PKR 19,000/year',
                'Girls Campus' => 'PKR 19,000/year',
            ],
            'address' => '654 Educators St, City',
            'contact' => [
                'phone' => '567-890-1234',
                'email' => 'contact@educators.edu',
            ],
            'established' => 2001,
        ],
    ];

    return Inertia::render('SchoolDetail', [
        'school' => $data[$school] ?? null,
    ]);
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
