<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function show($id)
    {
        $property = Property::where('id', $id)->first();

        // if(!$property) return redirect()->route('homepage');

        return Inertia::render('PropertyDetail/PropertyDetailPage', compact('property'));
    }
}
