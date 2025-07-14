<?php
namespace App\Http\Controllers;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class DashboardController extends Controller {
public function index()
{
    $user = Auth::user();
    $schools = SchoolProfile::with('user')
        ->select('reg_no', 'affiliation', 'level', 'address')
        ->get();
    $shops = ShopProfile::with('user') 
        ->select('shop_type', 'address','name')
        ->get();
    dd( $schools, $shops);
    return Inertia::render('dashboard', [
        'user'=>$user,
        'schools' => $schools,
        'shops' => $shops,
    ]);}
 }