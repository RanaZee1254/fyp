<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolProfile;
use App\Models\ShopProfile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
class DetailsController extends Controller
{
    public function index(Request $request): Response
    {
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
    public function store(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        if ($role === 'school') {
            $validated = $request->validate([
                'school_name'     => 'required|string|max:255',
                'reg_no'          => 'required|string|max:255',
                'address'         => 'required|string|max:255',
                'contact_number'  => 'required|string|max:15',
                'affiliation'     => 'nullable|string|max:255',
                'level'           => 'nullable|string|max:255',
                'image'           => 'nullable|image|max:2048',
            ]);
            $validated['image'] = $request->hasFile('image')
                ? $request->file('image')->store('school-images', 'public')
                : null;
            SchoolProfile::create(array_merge($validated, ['user_id' => $user->id]));
        } elseif ($role === 'shopkeeper') {
            $validated = $request->validate([
                'shop_name'      => 'required|string|max:255',
                'address'        => 'required|string|max:255',
                'contact_number' => 'required|string|max:15',
                'shop_type'      => 'required|string|max:255',
                'image'          => 'nullable|image|max:2048',
            ]);
            $validated['image'] = $request->hasFile('image')
                ? $request->file('image')->store('shop-images', 'public')
                : null;
            ShopProfile::create(array_merge($validated, ['user_id' => $user->id]));
        } else {
            return redirect()->route('dashboard');
        }
        return redirect()->route('dashboard');
    }
    public function edit($id)
    {
        $user = Auth::user();
        if ($user->role === 'school') {
            $detail = SchoolProfile::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();
            $profiles = SchoolProfile::where('user_id', $user->id)
                ->get(['id', 'school_name','contact_number','affiliation','level','address','image','reg_no']);
        } elseif ($user->role === 'shopkeeper') {
            $detail = ShopProfile::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();
            $profiles = ShopProfile::where('user_id', $user->id)
                ->get(['id', 'shop_name']);
        } else {
            abort(404);
        }
        return Inertia::render('Edit', [
            'profile'  => $detail,
            'profiles' => $profiles,
            'mode'     => 'update',
            'role'     => $user->role,
        ]);
    }
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if ($user->role === 'school') {
            $profile = SchoolProfile::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
            
            $validated = $request->validate([
                'school_name'    => 'required|string|max:255',
                'reg_no'         => 'required|string|max:255',
                'address'        => 'required|string|max:255',
                'contact_number' => 'required|string|max:15',
                'affiliation'    => 'nullable|string|max:255',
                'level'          => 'nullable|string|max:255',
                'image'          => 'nullable|image|max:2048',
            ]);
            if ($request->hasFile('image')) {
                if ($profile->image && Storage::disk('public')->exists($profile->image)) {
                    Storage::disk('public')->delete($profile->image);
                }
                $validated['image'] = $request->file('image')->store('school-images', 'public');
            } else {
                $validated['image'] = $profile->image;
            }
            $profile->update($validated);
        } elseif ($user->role === 'shopkeeper') {
            $profile = ShopProfile::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
            $validator = Validator::make($request->all(), [
                'shop_name'      => 'required|string|max:255',
                'address'        => 'required|string|max:255',
                'contact_number' =>'nullable|string|max:15',
                'shop_type'      => 'required|string|max:255',
                'image'          => 'nullable|image|max:2048',
            ]);
            if ($validator->fails()) {
                // dd($validator->errors()->toArray()); // 👈 see exactly what failed
            }
            $validated = $validator->validated();
            if ($request->hasFile('image')) {
                if ($profile->image && Storage::disk('public')->exists($profile->image)) {
                    Storage::disk('public')->delete($profile->image);
                }
                $validated['image'] = $request->file('image')->store('shop-images', 'public');
            }
            ShopProfile::where('id', $id)->update($validated);
        }
        return redirect()->route('dashboard')->with('success', 'Profile updated successfully!');
    }
    public function destroy($id)
    {
        $user = Auth::user();
        if ($user->role === 'school') {
            SchoolProfile::where('id', $id)->where('user_id', $user->id)->delete();
        } elseif ($user->role === 'shopkeeper') {
            ShopProfile::where('id', $id)->where('user_id', $user->id)->delete();
        }
        return redirect()->route('dashboard');
    }
}
