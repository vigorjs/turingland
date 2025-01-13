<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyCreateRequest;
use App\Models\Property;
use App\Services\Area\AreaService;
use App\Services\Developer\DeveloperService;
use App\Services\Property\PropertyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    private $propertyService;
    private $developerService;
    private $areaService;

    public function __construct(PropertyService $propertyService, DeveloperService $developerService, AreaService $areaService)
    {
        $this->propertyService = $propertyService;
        $this->developerService = $developerService;
        $this->areaService = $areaService;
    }

    /**
     * get all properties
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = $this->propertyService->getAllProperty();

        // dd($developers);
        // dd($areas);
        // dd($properties);

        return Inertia::render("Admin/Properties/AdminPropertyPage", [
            'properties' => $properties,

        ]);
    }

    public function create(){
        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();

        return Inertia::render("Admin/Properties/AdminCreatePropertyPage", [
            'developers' => $developers,
            'areas' => $areas
        ]);
    }

    public function store(PropertyCreateRequest $request)
    {

        $user = Auth::user();
        // $property = $this->propertyService->create($request);
        $request["user_id"] = $user->id;
        // dd($request->request);
        $property = Property::create($request->request->all());

        if ($request->hasFile('property_images')) {

            dd("test123");

            foreach ($request->property_images as $imageData) {
                $path = $imageData['file']->store('properties', 'public');
                
                $property->images()->create([
                    'path' => $path,
                    'caption' => $imageData['caption'] ?? null,
                ]);
            }
        }
        return Inertia::render("Admin/Properties/AdminPropertyPage")->with('success', 'Property created successfully');
    }

    public function edit(){

    }

    public function update(){

    }

    public function delete(){

    }
}
