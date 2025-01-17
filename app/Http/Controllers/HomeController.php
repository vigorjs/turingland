<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Category;
use App\Models\Developer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("Home/Home", [
            'areas' => Area::select('id', 'name')->get(),
            'developers' => Developer::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }
}
