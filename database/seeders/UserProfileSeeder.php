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
        $schoolUser = User::firstOrCreate(
            ['email' => 'school@example.com'],
            [
                'name' => 'Sunrise High School',
                'password' => bcrypt('your_password_here'),
                'role' => 'school',
                'contact_number' => '1112223333',
                'image' => 'sample.jpg',
                'address' => '123 Main St',
            ]
        );
        SchoolProfile::create([
            'user_id' => $schoolUser->id,
            'reg_no' => 'SCH-2025-001',
            'affiliation' => 'Cambridge',
            'level' => 'Secondary',
            'image' => 'sample.jpg',
            'contact_number' => $schoolUser->contact_number,
            'name' => $schoolUser->name,
            'address'=> $schoolUser->address,
        ]);
        $shopUser = User::firstOrCreate(
            ['email' => 'shopkeeper@example.com'],
            [
                'name' => 'City Bookstore',
                'password' => bcrypt('password'),
                'role' => 'shopkeeper',
                'contact_number' => '44556677',
                'image' => 'sample.jpg',
                'address' => '45 Market Lane',
            ]
        );
        ShopProfile::create([
            'user_id' => $shopUser->id,
            'shop_type' => $shopUser->shop_type ?? 'Bookshop',
            'address' => $shopUser->address,
            'image' => $shopUser->image,
            'contact_number' => $shopUser->contact_number,
            'name'=>$shopUser->name,
            'email' => $shopUser->email ?? 'no-email@example.com',
        ]);
        $parentUser = User::firstOrCreate(
            ['email' => 'parent@example.com'],
            [
                'name' => 'abc',
                'password' => bcrypt('password'),
                'role' => 'parent',
                'contact_number' => '11223344',
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
            'contact_number' => $parentUser->contact_number,
        ]);
    }
}
