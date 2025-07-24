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
        'role' => 'required|in:school,guardians,shopkeeper',
       
    ]);

    $imagePath = $request->file('image')->store('uploads', 'public');
    $user = User::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $request->input('password'),
        'Contact_Number' => $request->input('Contact_Number'),
        'role' => $request->input('role'),
        
    ]);
// dd('code ended 4');
    /*switch ($request->input('role')) {
        case 'school':
            SchoolProfile::create([
                'user_id' => $user->id,
                'school_reg_no' => $request->input('school_reg_no'),
                'affiliation' => $request->input('affiliation'),
                'level' => $request->input('level'),
                'image' => $imagePath,
            ]);
            break;
        case 'guardians':
            ParentProfile::create([
                'user_id' => $user->id,
                'student_name' => $request->input('student_name'),
                'student_age' => $request->input('student_age'),
                'student_class' => $request->input('student_class'),
            ]);
            break;
        case 'shopkeeper':
            ShopProfile::create([
                'user_id' => $user->id,
                'shop_type' => $request->input('shop_type'),
            ]);
            break;
    }*/
    dd('code ended 4');
    // Auth::login($user);
    return Inertia::render('dashboard', [],);
    }
}