<?php

namespace App\Http\Controllers;

use App\Exports\PropertyExport;
use App\Http\Requests\PropertyCreateRequest;
use App\Http\Requests\PropertyUpdateRequest;
use App\Models\Area;
use App\Models\Category;
use App\Models\Developer;
use App\Models\Location;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Services\Area\AreaService;
use App\Services\Category\CategoryService;
use App\Services\Developer\DeveloperService;
use App\Services\Property\PropertyService;
use App\Services\PropertyImage\PropertyImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminPropertyController extends Controller
{
    private $propertyService;
    private $developerService;
    private $areaService;
    private $propertyImageService;
    private $categoryService;

    public function __construct(
        PropertyService $propertyService,
        DeveloperService $developerService,
        AreaService $areaService,
        PropertyImageService $propertyImageService,
        CategoryService $categoryService
    ) {
        $this->propertyService = $propertyService;
        $this->developerService = $developerService;
        $this->areaService = $areaService;
        $this->propertyImageService = $propertyImageService;
        $this->categoryService = $categoryService;
    }

    /**
     * get all properties
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Validasi query string
        $filters = $request->validate([
            'title' => 'nullable|string|max:255',
            'area_id' => 'nullable|integer',
            'category_id' => 'nullable|integer', 
            'developer_id' => 'nullable|integer', 
            'location_id' => 'nullable|integer', 
            'price_min' => 'nullable|numeric',
            'price_max' => 'nullable|numeric',
            'type' => 'nullable|string',
            'status' => 'nullable|string',
            'bathroom_count' => 'nullable|integer',
            'bedroom_count' => 'nullable|integer',
            'carport_count' => 'nullable|integer',
            'land_area_min' => 'nullable|numeric',
            'land_area_max' => 'nullable|numeric',
            'building_area_min' => 'nullable|numeric',
            'building_area_max' => 'nullable|numeric',
            'year_built' => 'nullable|integer',
            'is_featured' => 'nullable|boolean'
        ]);

        // Ambil data properti dengan filter
        $properties = $this->propertyService->getAllProperty($filters);

        return Inertia::render("Admin/Properties/AdminPropertyPage", [
            'properties' => $properties,
            'areas' => Area::all(),
            'categories' => Category::all(),
            'developers' => Developer::all(),
            'locations' => Location::all(),
        ]);
    }

    public function detail($id)
    {
        $property = $this->propertyService->getPropertyById($id);

        return Inertia::render("Admin/Properties/AdminDetailPropertyPage", [
            'property' => $property[0]
        ]);
    }

    public function create()
    {
        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();
        // $categories = $this->categoryService->all()->getData();
        $categories = Category::select('id', 'name')
        ->get()
        ->map(function($category) {
            return [
                'id' => $category->id,
                'name' => $category->name
            ];
        });

        return Inertia::render("Admin/Properties/AdminCreatePropertyPage", [
            'developers' => $developers,
            'areas' => $areas,
            'categories' => $categories
        ]);
    }

    public function store(PropertyCreateRequest $request)
    {
        $this->propertyService->createPropertyWithImages(
            array_merge(
                $request->except('property_images'),
                ['user_id' => Auth::id()]
            ),
            $request->property_images
        );

        return redirect()->route('dashboard.property');
    }

    public function edit($id)
    {
        $property = $this->propertyService->getPropertyById($id);
        // dd($property);
        

        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();
        $categories = $this->categoryService->all()->getData();

        return Inertia::render("Admin/Properties/AdminEditPropertyPage", [
            'property' => $property[0],
            'developers' => $developers,
            'areas' => $areas,
            'categories' => $categories
        ]);
    }

    public function update(PropertyUpdateRequest $request, $id)
    {
        // dd($request);
        $this->propertyService->updatePropertyWithImages(
            $id,
            array_merge(
                $request->except(['property_images', 'new_images', 'existing_images']),
                ['user_id' => Auth::id()]
            ),
            $request->new_images,
            $request->existing_images
        );

        return redirect()->route('dashboard.property');
    }

    public function delete($id)
    {
        $this->propertyService->delete($id);

        return redirect()->back();
    }

    public function export(Request $request)
    {
        // dd($request);
        $filters = $request->only([
            'title',
            'area_id',
            'price_min',
            'price_max',
            'developer_id',
            'type',
            'status',
            'bathroom_count',
            'bedroom_count',
            'carport_count',
            'land_area_min',
            'land_area_max',
            'building_area_min',
            'building_area_max',
            'year_built',
            'is_featured'
        ]);
        // dd($filters);

        return Excel::download(new PropertyExport($filters), 'properties.xlsx');
    }
}
