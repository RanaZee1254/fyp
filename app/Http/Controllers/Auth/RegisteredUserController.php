<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SchoolProfile;
use App\Models\ParentProfile;
use App\Models\ShopProfile; 
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
  public function store(Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'Contact_Number' => 'required|string|max:20',
        'address' => 'required|string|max:255',
        'role' => 'required|in:school,guardians,shopkeeper',
        'image' => 'required|file|image|max:2048',
        // Conditional
        'school_reg_no' => 'required_if:role,school',
        'affiliation' => 'required_if:role,school',
        'level' => 'required_if:role,school',
        'student_name' => 'required_if:role,guardians',
        'student_age' => 'required_if:role,guardians',
        'student_class' => 'required_if:role,guardians',
        'shop_type' => 'required_if:role,shopkeeper',
    ]);

    $imagePath = $request->file('image')->store('uploads', 'public');
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password,
        'Contact_Number' => $request->Contact_Number,
        'address' => $request->address,
        'role' => $request->role,
        'image' => $imagePath,
    ]);

    switch ($request->role) {
        case 'school':
            SchoolProfile::create([
                'user_id' => $user->id,
                'school_reg_no' => $request->school_reg_no,
                'affiliation' => $request->affiliation,
                'level' => $request->level,
            ]);
            break;
        case 'guardians':
            ParentProfile::create([
                'user_id' => $user->id,
                'student_name' => $request->student_name,
                'student_age' => $request->student_age,
                'student_class' => $request->student_class,
            ]);
            break;
        case 'shopkeeper':
            ShopProfile::create([
                'user_id' => $user->id,
                'shop_type' => $request->shop_type,
            ]);
            break;
    }
    dd('code ended 4');
    Auth::login($user);
    return Inertia::render('dashboard', [],);
    }
}