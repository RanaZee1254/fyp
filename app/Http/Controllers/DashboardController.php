<?php
namespace App\Http\Controllers;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class DashboardController extends Controller {
public function index()
{
    // dd('code ended 2');
    $user = Auth::user();
    $schools = SchoolProfile::with('user')
        ->select('reg_no', 'affiliation', 'level', 'address','name','email','Contact_Number')
        ->get();
    $shops = ShopProfile::with('user') 
        ->select('shop_type', 'address','email','Contact_Number')
        ->get();
    // dd('code ended 2');
    return Inertia::render('dashboard', [
        'user'=>$user,
        'schools' => $schools,
        'shops' => $shops,
    ]);
 }}