<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyCreateRequest;
use App\Http\Requests\PropertyUpdateRequest;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Services\Area\AreaService;
use App\Services\Developer\DeveloperService;
use App\Services\Property\PropertyService;
use App\Services\PropertyImage\PropertyImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    private $propertyService;
    private $developerService;
    private $areaService;
    private $propertyImageService;

    public function __construct(
        PropertyService $propertyService,
        DeveloperService $developerService,
        AreaService $areaService,
        PropertyImageService $propertyImageService
        )
    {
        $this->propertyService = $propertyService;
        $this->developerService = $developerService;
        $this->areaService = $areaService;
        $this->propertyImageService = $propertyImageService;
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
            'price_min' => 'nullable|numeric',
            'price_max' => 'nullable|numeric',
        ]);

        // Ambil data properti dengan filter
        $properties = $this->propertyService->getAllProperty($filters);

        return Inertia::render("Admin/Properties/AdminPropertyPage", [
            'properties' => $properties,
        ]);
    }

    public function detail($id){
        $property = $this->propertyService->getPropertyById($id);

        return Inertia::render("Admin/Properties/AdminDetailPropertyPage", [
            'property' => $property[0]
        ]);
    }

    public function create()
    {
        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();

        return Inertia::render("Admin/Properties/AdminCreatePropertyPage", [
            'developers' => $developers,
            'areas' => $areas
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

    public function edit($id) {
        $property = $this->propertyService->getPropertyById($id);
        // dd($property);

        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();

        return Inertia::render("Admin/Properties/AdminEditPropertyPage", [
            'property' => $property[0],
            'developers' => $developers,
            'areas' => $areas
        ]);
    }

    public function update(PropertyUpdateRequest $request, $id)
    {
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

    public function delete($id) {
        $this->propertyService->delete($id);

        return redirect()->back();
    }

    public function export(Request $request) {
        dd($request);
    }
}
