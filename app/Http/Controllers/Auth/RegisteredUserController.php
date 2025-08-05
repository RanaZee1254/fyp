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
        // dd('code ended 1', $request->all());
        $request->validate([
            'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
         'password' => ['required', 'confirmed', Rules\Password::defaults()],
         'contact_number' => 'required|string|max:20',
         'role' => 'required|in:school,parent,shopkeeper',
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact_number' => $request->contact_number,
            'role' => $request->role,
        ]);
        // dd('code ended 1');
    return redirect()->route('login');
    }
}
