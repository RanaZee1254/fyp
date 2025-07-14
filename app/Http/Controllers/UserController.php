<?php
namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }
   public function Dashboard()
    {
    $schools = User::where('role', 'school')
        ->with('schoolProfile')
        ->get()
        ->pluck('schoolProfile')
        ->filter();
    $shops = User::where('role', 'shopkeeper')
        ->with('shopProfile')
        ->get()
        ->pluck('shopProfile')
        ->filter();
    return Inertia::render('dashboard', [  
        'user' => Auth::user(),
        'schools' => $schools->values(),
        'shops' => $shops->values(),
    ]);
}}
