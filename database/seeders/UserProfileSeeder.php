<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\School;
use App\Models\ShopProfile;
use App\Models\ParentProfile;
use Illuminate\Support\Facades\Hash;

class UserProfileSeeder extends Seeder
{
    public function run(): void
    {
        // Create a school user and profile
        $schoolUser = User::create([
            'name' => 'Sunrise High School',
            'email' => 'school@example.com',
            'password' => Hash::make(''),
            'role' => 'school',
            'Contact_Number' => '1112223333',
        ]);

        School::create([
            'user_id' => $schoolUser->id,
            'reg_no' => 'SCH-2025-001',
            'affiliation' => 'Cambridge',
            'level' => 'Secondary',
            'address' => '123 Main St',
        ]);

        // Create a shopkeeper user and profile
        $shopUser = User::create([
            'name' => 'City Bookstore',
            'email' => 'shopkeeper@example.com',
            'password' => Hash::make(''),
            'role' => 'shopkeeper',
            'Contact_Number' => '44556677',
        ]);

        ShopProfile::create([
            'user_id' => $shopUser->id,
            'shop_type' => 'bookshop',
            'address' => '45 Market Lane',
        ]);
        // Create a parent user and profile
        $parentUser = User::create([
            'name' => 'abc',
            'email' => 'parent@example.com',
            'password' => Hash::make(''),
            'role' => 'parent',
            'Contact_Number' => '11223344',
        ]);
        ParentProfile::create([
            'user_id' => $parentUser->id,
            'student_name' => 'Mr x',
            'student_class' => 'Grade 4',
            'student_age' => 9,
        ]);
    }
}
