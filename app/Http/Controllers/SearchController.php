<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $properties = Property::query()
            ->filter($request->all())
            ->with(['developer', 'images', 'categories', 'area'])
            ->paginate(12)
            ->withQueryString();

        $banner = Banner::whereNotNull('image_path')->get();

        foreach ($request->all() as $key => $value) {
            if (!is_null($value)) {
                $log = [];
                $log[$key] = $value;
                Log::channel('db')->info("search index", $log);
            }
        }

        // dd($properties);

        return Inertia::render('Search/Search', [
            'properties' => $properties,
            'categories' => Category::orderBy('name')->get(),
            'areas' => Area::orderBy('name')->get(),
            'filters' => $request->all(),
            'auth' => Auth::user(),
            'banner' => $banner
        ]);
    }

    public function indexApi(Request $request)
    {
        $properties = Property::query()
            ->filter($request->all())
            ->with(['developer', 'images', 'categories', 'area'])
            ->paginate(12)
            ->withQueryString();

            foreach ($request->all() as $key => $value) {
                if (!is_null($value)) {
                    $log = [];
                    $log[$key] = $value;
                    Log::channel('db')->info("search index", $log);
                }
            }


        // dd($properties);

        return response()->json([
            'properties' => $properties,
            'filters' => $request->all()
        ]);;
    }
}
