<?php
namespace App\Http\Controllers;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Auth;
abstract class Controller
{
  

public function getSchoolProfile()
{
    $userId = Auth::id();

    $profile = SchoolProfile::where('user_id', $userId)->first();

    return response()->json($profile);
}
public function getShopProfile()
{
    $userId = Auth::id();

    $profile = SchoolProfile::where('user_id', $userId)->first();

    return response()->json($profile);
}}