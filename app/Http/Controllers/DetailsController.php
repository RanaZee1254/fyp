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
   public function create(Request $request) 
{ 
    dd('code ended 001');
    $role = $request->query('role');
    if (!in_array($role, ['school', 'shopkeeper'])) {
        abort(404);
         return Inertia::render('details', [
        'role' => $role,
    ]);
    }
}
    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        dd('code ended 112');
     $users = Auth::user();
    //  dd('code ended 112');
       $role = $users->role;
        if ($role === 'school') {
           $validated = $request->validate([
    'school_name' => 'required|string|max:255',
    'address' => 'required|string|max:255',
    'reg_no' => 'required|string|max:255',
    'affiliation' => 'nullable|string|max:255',
    'level' => 'nullable|string|max:255',
    'Contact_Number' => 'nullable|string|max:20',
    'image' => 'required|image|max:2048',
]);
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('school-images', 'public');
            }
            SchoolProfile::create([
                'user_id' => $users->id,
                'name' => $request['school_name'],
                'reg_no' => $request['reg_no'],
                'affiliation' => $request['affiliation'] ?? null,
                'level' => $request['level'] ?? null,
                'image' => $validated['image'] ?? null,
                'address' => $request['address'],
                 'Contact_Number'=>$validated['Contact_Number'] ?? null,
            ]);
        } elseif ($role === 'shopkeeper') {
            $validated = $request->validate([
                'shop_name' => 'required|string|max:255',
                'shop_type' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'image' => 'required|image|max:2048',
            ]);
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('shop-images', 'public');
            }
            ShopProfile::create([
                'user_id' => $users->id,
                'shop_name' => $request['shop_name'],
                'shop_type' => $request['shop_type'],
                'address' => $request['address'],
                'image' => $validated['image'] ?? null,
            ]);
        } elseif ($role === 'parent') {
            return redirect()->route('dashboard');
        }
        // dd('code ended 112');
        return redirect()->route('dashboard');
    }
}
