<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all users with the role 'customer'
        $customers = User::role('customer')->with('roles')->paginate(8);

        return Inertia::render("Admin/Customer/AdminCustomerPage", [
            "customers" => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
 * Store a newly created resource in storage.
 */
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users,email',
        'password' => 'required|string|min:6',
        'wa_number' => 'required',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $customer = new User();
    $customer->name = $request->name;
    $customer->email = $request->email;
    $customer->password = Hash::make($request->password);
    $customer->wa_number = $request->wa_number;

    // Handle photo upload
    if ($request->hasFile('photo')) {
        $photoPath = $request->file('photo')->store('photos', 'public');
        $customer->photo = $photoPath;
    }

    $customer->save();

    // Assign role 'customer'
    $customer->assignRole('customer');

    return redirect()->route('dashboard.customer');
}


    /**
     * Display the specified customer.
     */
    public function show(string $id)
    {
        $customer = User::role('customer')->findOrFail($id);
        return response()->json(['customer' => $customer]);
    }

    /**
     * Update the specified customer in storage.
     */
    /**
 * Update the specified customer in storage.
 */
public function update(Request $request, string $id)
{
    $customer = User::role('customer')->findOrFail($id);

    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|string|email|unique:users,email,' . $id,
        'password' => 'nullable|string|min:6',
        'wa_number' => 'sometimes|unique:users,wa_number,' . $id,
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $customer->fill($request->only(['name', 'email', 'wa_number']));

    if ($request->filled('password')) {
        $customer->password = Hash::make($request->password);
    }

    // Handle photo update
    if ($request->hasFile('photo')) {
        // Delete old photo if exists
        if ($customer->photo && Storage::disk('public')->exists($customer->photo)) {
            Storage::disk('public')->delete($customer->photo);
        }

        $photoPath = $request->file('photo')->store('photos', 'public');
        $customer->photo = $photoPath;
    }

    $customer->save();

    return redirect()->route('dashboard.customer');
}
}
