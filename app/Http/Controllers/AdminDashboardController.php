<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request) {
        $totalUser = User::role('customer')->count();
        $totalDeveloper = Developer::count();
        $totalAgent = User::role('agent')->count();
        $totalProperty = Property::count();
        $latestDevelopers = Developer::
        orderBy('created_at', 'desc')
        ->take(5)
        ->get();

        $latestAgents = User::role('agent')->orderBy('created_at', 'desc')->take(5)->get();
            

        return Inertia::render("Admin/Dashboards/AdminDashboardPage", [
            'totalUser' => $totalUser,
            'totalDeveloper' => $totalDeveloper,
            'totalAgent' => $totalAgent,
            'totalProperty' => $totalProperty,
            'latestDevelopers' => $latestDevelopers,
            'latestAgents' => $latestAgents
        ]);
    }
}
