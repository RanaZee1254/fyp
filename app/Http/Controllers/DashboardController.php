<?php
namespace App\Http\Controllers;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
class DashboardController extends Controller
{
   public function index(): Response
{
    $user = Auth::user();
    $role = $user->role;
    $schoolProfile = SchoolProfile::where('user_id', $user->id)->first();
    $shopProfile   = ShopProfile::where('user_id', $user->id)->first();
    $user->SchoolProfile = $schoolProfile;
    $user->ShopProfile   = $shopProfile;
    $schools = collect();
    $shops = collect();
    if ($role === 'school') {
        $schools = SchoolProfile::with('user')
            ->select('id','reg_no','affiliation','level','address','school_name','email','contact_number','image')
            ->where('user_id', $user->id)
            ->get();
    } elseif ($role === 'shopkeeper') {
        $shops = ShopProfile::with('user')
            ->select('id','shop_type','image','address','email','contact_number','shop_name')
            ->where('user_id', $user->id)
            ->get();
    } else {
        $shops = ShopProfile::with('user')
            ->select('id','shop_type','address','email','image','contact_number','shop_name')
            ->get();

        $schools = SchoolProfile::with('user')
            ->select('id','reg_no','affiliation','level','address','school_name','email','contact_number','image')
            ->get();
    }
    return Inertia::render('dashboard', [
        'auth' => [ 'user' => $user ],
        'schools' => $schools,
        'shops' => $shops,
    ]);
}
    public function details(): Response {
        return Inertia::render('details');
    }
}
