<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Category;
use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("Home/Home", [
            "auth" => Auth::user(),
            'areas' => Area::select('id', 'name')->get(),
            'developers' => Developer::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }
}
