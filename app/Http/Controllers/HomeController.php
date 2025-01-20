<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Developer;
use App\Models\Location;
use App\Models\Property;
use App\Models\Testimony;
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
            'categories' => Category::select('id', 'name')->with(['properties.images'])->get(),
            'locations' => Location::select('id', 'name')->get(),
            'testimonials' => Testimony::all(),
            'banners' => Banner::all(),
            'latestProperties' => Property::with(['area', 'developer', 'categories', 'images'])
                ->latest()
                ->limit(6)
                ->get(),
            'featuredProperties' => Property::where('is_featured', true)->with(['area', 'developer', 'categories', 'images'])
                ->latest()
                ->limit(6)
                ->get()

        ]);
    }
}
