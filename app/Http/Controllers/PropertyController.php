<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function show($id)
    {
        $property = Property::where('id', $id)->with(['images', 'categories', 'area.location', 'developer', 'agent'])->first();
        $auth = Auth::user();
        $featuredProp = Property::where('is_featured', true)->with(['area', 'developer', 'categories', 'images'])
                ->latest()
                ->limit(6)
                ->get();
        $banner = Banner::all();

        // dd($banner);
        // if(!$property) return redirect()->route('homepage');

        return Inertia::render('PropertyDetail/PropertyDetailPage', compact('property', 'auth', 'featuredProp', 'banner'));
    }
}
