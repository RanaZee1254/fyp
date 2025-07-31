<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
         'password' => ['required', 'confirmed', Rules\Password::defaults()],
         'Contact_Number' => 'required|string|max:20',
         'role' => 'required|in:school,guardians,shopkeeper',
        ]);
        $users = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'Contact_Number' => $request->Contact_Number,
            'role' => $request->role,
        ]);
        event(new Registered($users));
    return redirect()->route('details')->with(['role' => $users->role]);
    }
}
