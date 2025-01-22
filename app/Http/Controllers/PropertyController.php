<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function show($id)
    {
        $property = Property::where('id', $id)->with(['images', 'categories', 'area.location', 'developer'])->first();
        $auth = Auth::user();
        // if(!$property) return redirect()->route('homepage');

        return Inertia::render('PropertyDetail/PropertyDetailPage', compact('property', 'auth'));
    }
}
