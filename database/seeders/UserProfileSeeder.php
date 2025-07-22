<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ShopProfile;
use App\Models\ParentProfile;
use App\Models\SchoolProfile;
use Illuminate\Support\Facades\Hash;
class UserProfileSeeder extends Seeder
{
    public function run(): void
    {
        // Create a school user and profile
        $schoolUser = User::firstOrCreate(
[], 
    [
        'email' => 'school@example.com',
        'name' => 'Sunrise High School',
        'password' => bcrypt('your_password_here'),
        'role' => 'school',
        'Contact_Number' => '1112223333',
         'image'=>'sample.jpg',
            'address' => '123 Main St',
    ]
);
        SchoolProfile::Create([
            'user_id' => $schoolUser->id,
            'reg_no' => 'SCH-2025-001',
            'affiliation' => 'Cambridge',
            'level' => 'Secondary',
            'image'=>'sample.jpg',
            'address' => '123 Main St',
        ]);
        // Create a shopkeeper user and profile
        $shopUser = User::firstOrCreate([],
        [
            'name' => 'City Bookstore',
            'email' => 'shopkeeper@example.com',
           'password' => bcrypt('password'),
            'role' => 'shopkeeper',
            'Contact_Number' => '44556677',
        ]);
        ShopProfile::create([
            'user_id' => $shopUser->id,
            'shop_type' => 'bookshop',
            'address' => '45 Market Lane',
            'image'=>'sample.jpg',
        ]);
        // Create a parent user and profile
       $parentUser = User::firstOrCreate(
    ['email' => 'parent@example.com'],
    [
        'name' => 'abc',
        'password' => bcrypt('password'),
        'role' => 'guardian',
        'Contact_Number' => '11223344',
    ]
);

if ($parentUser && $parentUser->id) {
    ParentProfile::create([
        'user_id' => $parentUser->id,
        'student_name' => 'Mr x',
        'student_class' => 'Grade 4',
        'student_age' => 9,
        'image' => 'sample.jpg',
        'address' => '123 street'
    ]);
}
}}
