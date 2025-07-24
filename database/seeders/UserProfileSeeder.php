<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ShopProfile;
use App\Models\ParentProfile;
use App\Models\SchoolProfile;
use Illuminate\Support\Facades\Hash;

use function Psy\sh;

class UserProfileSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a school user and profile
        $schoolUser = User::firstOrCreate(
            ['email' => 'school@example.com'],
            [
                'name' => 'Sunrise High School',
                'password' => bcrypt('your_password_here'),
                'role' => 'school',
                'Contact_Number' => '1112223333',
                'image' => 'sample.jpg',
            ]
        );

        SchoolProfile::create([
            'user_id' => $schoolUser->id,
            'reg_no' => 'SCH-2025-001',
            'affiliation' => 'Cambridge',
            'level' => 'Secondary',
            'image' => 'sample.jpg',
            'address' => '123 Main St',
            'Contact_Number' => $schoolUser->Contact_Number,
            'name' => $schoolUser->name,
        ]);

        // 2. Create a shopkeeper user and profile
        $shopUser = User::firstOrCreate(
            ['email' => 'shopkeeper@example.com'],
            [
                'name' => 'City Bookstore',
                'password' => bcrypt('password'),
                'role' => 'shopkeeper',
                'Contact_Number' => '44556677',
                'image' => 'sample.jpg',
                'address' => '45 Market Lane',
              
            ]
        );

        ShopProfile::create([
            'user_id' => $shopUser->id,
            'shop_type' => $shopUser->shop_type ?? 'Bookshop',
            'address' => $shopUser->address,
            'image' => $shopUser->image,
            'Contact_Number' => $shopUser->Contact_Number,
            'name'=>$shopUser->name,
            'email' => $shopUser->email ?? 'no-email@example.com',
        ]);

        // 3. Create a parent user and profile
        $parentUser = User::firstOrCreate(
            ['email' => 'parent@example.com'],
            [
                'name' => 'abc',
                'password' => bcrypt('password'),
                'role' => 'guardian',
                'Contact_Number' => '11223344',
                'image' => 'sample.jpg',
                'address' => '123 street',
            ]
        );

        ParentProfile::create([
            'user_id' => $parentUser->id,
            'student_name' => 'Mr x',
            'student_class' => 'Grade 4',
            'student_age' => 9,
            'image' => $parentUser->image,
            'address' => $parentUser->address,
            'Contact_Number' => $parentUser->Contact_Number,
        ]);
    }
}
