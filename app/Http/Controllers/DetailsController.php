<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
class DetailsController extends Controller
{
    public function store(Request $request)
    {
        // dd('code ended 112');
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
                'image' => 'nullable|image|max:2048',
            ]);
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('school-images', 'public');
            }
            SchoolProfile::create([
                'user_id' => $users->id,
                'name' => $validated['school_name'],
                'reg_no' => $validated['reg_no'],
                'affiliation' => $validated['affiliation'] ?? null,
                'level' => $validated['level'] ?? null,
                'image' => $validated['image'] ?? null,
                'address' => $validated['address'],
            ]);
        } elseif ($role === 'shopkeeper') {
            $validated = $request->validate([
                'shop_name' => 'required|string|max:255',
                'shop_type' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'image' => 'nullable|image|max:2048',
            ]);
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('shop-images', 'public');
            }
            ShopProfile::create([
                'user_id' => $users->id,
                'shop_name' => $validated['shop_name'],
                'shop_type' => $validated['shop_type'],
                'address' => $validated['address'],
                'image' => $validated['image'] ?? null,
            ]);
        } elseif ($role === 'guardians') {
            return redirect()->route('dashboard')->with('success', 'Details submitted successfully.');
        }
        return redirect()->route('dashboard')->with('success', 'Details submitted successfully.');
    }
}
