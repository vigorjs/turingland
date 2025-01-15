<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all users with the role 'agent'
        $agents = User::role('agent')->with('roles')->paginate(8);

        return Inertia::render("Admin/Agent/AdminAgentPage", [
            "agents" => $agents
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
        'wa_number' => 'required|unique:users,wa_number|regex:/^\+?(\d{1,3})?\s?\d{9,15}$/',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'is_agent_active' => 'sometimes|boolean',
    ]);

    $agent = new User();
    $agent->name = $request->name;
    $agent->email = $request->email;
    $agent->password = Hash::make($request->password);
    $agent->wa_number = $request->wa_number;
    $agent->is_agent_active = $request->has('is_agent_active') ? $request->is_agent_active : false;

    // Handle photo upload
    if ($request->hasFile('photo')) {
        $photoPath = $request->file('photo')->store('photos', 'public');
        $agent->photo = $photoPath;
    }

    $agent->save();

    // Assign role 'agent'
    $agent->assignRole('agent');

    return redirect()->route('dashboard.agent');
}


    /**
     * Display the specified agent.
     */
    public function show(string $id)
    {
        $agent = User::role('agent')->findOrFail($id);
        return response()->json(['agent' => $agent]);
    }

    /**
     * Update the specified agent in storage.
     */
    /**
 * Update the specified agent in storage.
 */
public function update(Request $request, string $id)
{
    $agent = User::role('agent')->findOrFail($id);

    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|string|email|unique:users,email,' . $id,
        'password' => 'nullable|string|min:6',
        'wa_number' => 'sometimes|regex:/^\+?(\d{1,3})?\s?\d{9,15}$/|unique:users,wa_number,' . $id,
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'is_agent_active' => 'sometimes|boolean',
    ]);

    $agent->fill($request->only(['name', 'email', 'wa_number', 'is_agent_active']));

    if ($request->filled('password')) {
        $agent->password = Hash::make($request->password);
    }

    // Handle photo update
    if ($request->hasFile('photo')) {
        // Delete old photo if exists
        if ($agent->photo && Storage::disk('public')->exists($agent->photo)) {
            Storage::disk('public')->delete($agent->photo);
        }

        $photoPath = $request->file('photo')->store('photos', 'public');
        $agent->photo = $photoPath;
    }

    $agent->save();

    return redirect()->route('dashboard.agent');
}
}
