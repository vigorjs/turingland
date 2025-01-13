<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyCreateRequest;
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
    public function index()
    {
        $properties = $this->propertyService->getAllProperty();

        return Inertia::render("Admin/Properties/AdminPropertyPage", [
            'properties' => $properties,

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
        // Debug untuk melihat data yang masuk
        Log::info('Request all:', $request->all());
        Log::info('Files:', $request->allFiles());
    
        // Create property
        $property = $this->propertyService->create(array_merge(
            $request->except('property_images'),
            ['user_id' => Auth::id()]
        ));
    
        if ($request->property_images) {
            // dd($property->getData());
            foreach ($request->property_images as $index => $imageData) {
                if (!isset($imageData['file']) || !$imageData['file'] instanceof \Illuminate\Http\UploadedFile) {
                    continue;
                }
    
                $file = $imageData['file'];
                
                // Generate unique filename
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Store file
                $path = $file->storeAs('properties', $filename, 'public');
    
                $this->propertyImageService->create([
                    'property_id' => $property->getData()->id,
                    'image_path' => $path,
                    'is_primary' => $index === 0,
                    'order' => $index
                ]);
            }
        }
    
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

    public function update() {}

    public function delete() {}
}
