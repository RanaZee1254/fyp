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
        $schools = SchoolProfile::with('user')
            ->select('reg_no', 'affiliation', 'level', 'address', 'name', 'email', 'contact_number')
            ->get();
        $shops = ShopProfile::with('user')
            ->select('shop_type', 'address', 'email', 'contact_number')
            ->get();
            // dd('code ended 0002');
        return Inertia::render('dashboard', [
            'user' => $user,
            'role' => $role,
            'schools' => $schools,
            'shops' => $shops,
        ]);
    }
}
