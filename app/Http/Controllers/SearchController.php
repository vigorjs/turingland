<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Location;
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
            ->with(['developer', 'images', 'categories', 'area', 'agent'])
            ->paginate(12)
            ->withQueryString();

        $banner = Banner::whereNotNull('image_path')->get();

        $this->logger($request, "search index");

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

        $this->logger($request, "search index api");

        // dd($properties);

        return response()->json([
            'properties' => $properties,
            'filters' => $request->all()
        ]);;
    }

    private function logger(Request $request, string $message){
        foreach ($request->all() as $key => $value) {
            if (!is_null($value)) {
                $log = [];
                switch ($key) {
                    case 'category_id':
                        $name = Category::select('name')->where('id', $value)->first();
                        $value = $name['name'];
                        break;
                    case 'location_id':
                        $name = Location::select('name')->where('id', $value)->first();
                        $value = $name['name'];
                        break;
                    case 'area_id':
                        $name = Area::select('name')->where('id', $value)->first();
                        $value = $name['name'];
                        break;
                }
                $key = substr($key, 0, -3);
                $log[$key] = $value;
                Log::channel('db')->info($message, $log);
            }
        }
    }
}
