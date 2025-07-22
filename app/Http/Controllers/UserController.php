<?php
namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function index()
    {
        dd('code ended 3');
        $users = User::all();
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }
}
