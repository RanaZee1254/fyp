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
    // Fetch school records (could be all or just those owned by user)
    $schools = SchoolProfile::with('user') // if needed
        ->select('reg_no', 'affiliation', 'level', 'address')
        ->get();
    // Fetch shop records
    $shops = ShopProfile::with('user') // if needed
        ->select('shop_type', 'address')
        ->get();

    dd( $schools, $shops);
    return Inertia::render('Dashboard', [
        'user'=>$user,
        'schools' => $schools,
        'shops' => $shops,
    ]);}
 }