<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\School;
use App\Models\ShopProfile;
use App\Models\ParentProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserProfileSeeder extends Seeder
{
    public function run(): void
    {
        // School User
        $schoolUser = User::create([
            'name' => 'Sunrise High School',
            'email' => 'school@example.com',
            'password' => Hash::make('password'),
            'role' => 'school',
            'Contact_Number' => '1112223333',
        ]);

        School::create([
            'user_id' => $schoolUser->id,
            'reg_no' => 'SCH12345',
            'affiliation' => 'Board A',
            'level' => 'Secondary',
            'address' => '123 School Street',
        ]);

        // Shopkeeper User
        $shopkeeperUser = User::create([
            'name' => 'City Bookstore',
            'email' => 'shopkeeper@example.com',
            'password' => Hash::make('password'),
            'role' => 'shopkeeper',
            'Contact_Number' => '2223334444',
        ]);

        ShopProfile::create([
            'user_id' => $shopkeeperUser->id,
            'shop_type' => 'bookshop',
            'address' => '45 Market Lane',
        ]);

        // Parent User
        $parentUser = User::create([
            'name' => 'Jane Doe',
            'email' => 'parent@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'Contact_Number' => '3334445555',
        ]);

        ParentProfile::create([
            'user_id' => $parentUser->id,
            'student_name' => 'John Doe',
            'student_class' => 'Grade 4',
            'student_age' => 9,
        ]);
    }
}
