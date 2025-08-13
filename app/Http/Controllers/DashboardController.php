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
        $schools = collect();
        $shops = collect();
        if($role == 'school') {
            $schools = SchoolProfile::with('user')
                ->select('reg_no', 'affiliation', 'level', 'address', 'school_name', 'email', 'contact_number')
                ->where('user_id', $user->id)->get();
        } elseif ($role == 'shopkeeper') {
            $shops = ShopProfile::with('user')
                ->select('shop_type', 'address', 'email', 'contact_number','shop_name')
                 ->where('user_id', $user->id)->get();
        } else {
            $shops = ShopProfile::with('user')
                ->select('shop_type', 'address', 'email', 'contact_number','shop_name')->get();
            $schools = SchoolProfile::with('user')
                ->select('reg_no', 'affiliation', 'level', 'address', 'school_name', 'email', 'contact_number')
                ->get();
        }
            // dd('code ended 0002');
        return Inertia::render('dashboard', [
            'user' => $user,
            'role' => $role,
            'schools' => $schools,
            'shops' => $shops,
        ]);
    }
    public function details(): Response {
        return Inertia::render('details');
    }
}
