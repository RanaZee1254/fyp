<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
class DetailsController extends Controller
{
    public function index(Request $request): Response {
        $role = $request->query('role');
       $role = Auth::user()?->role;
if (!in_array($role, ['school', 'shopkeeper'])) {
    abort(404);
}
    return Inertia::render('details', ['role' => $role]);
}
   public function create(Request $request): Response
{
    $user = Auth::user();

    if (!in_array($user->role, ['school', 'shopkeeper'])) {
        abort(404);
    }

    return Inertia::render('details/create', [
        'role' => $user->role
    ]);
}
    /**
     * @throws \Illuminate\Validation\ValidationException
     */
   public function store(Request $request)
{
    $user = Auth::user();
    $role = $user->role;
    if ($role === 'school') {
        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'reg_no' => 'required|string|max:255',
            'address'=>'required|string|max:255',
            'contact_number'=>'required|string|max:15',
            'affiliation' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);
        $imagePath = $request->file('image')?->store('school-images', 'public');
        if ($imagePath) {
            $validated['image'] = $imagePath;
        }
        SchoolProfile::create(array_merge($validated, ['user_id' => $user->id]));
    } elseif ($role === 'shopkeeper') {
        $validated = $request->validate([
            'shop_name' => 'required|string|max:255',
            'address'=>'required|string|max:255',
            'contact_number'=>'required|string|max:15',
            'shop_type' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);
        $imagePath = $request->file('image')?->store('shop-images', 'public');
        if ($imagePath) {
            $validated['image'] = $imagePath;
        }
        ShopProfile::create(array_merge($validated, ['user_id' => $user->id]));
    } else {
        // dd('code ended 0011');
        return redirect()->route('dashboard');
    }
//  dd('code ended 0011');
    return redirect()->route('dashboard');
}

}
