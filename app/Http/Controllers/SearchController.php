<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $properties = Property::query()
            ->filter($request->all())
            ->with('developer')
            ->paginate(12)
            ->withQueryString();

        // dd($properties);

        return Inertia::render('Search/Search', [
            'properties' => $properties,
            'filters' => $request->all(),
        ]);
    }
}
