<?php

namespace App\Http\Controllers;

use App\Services\Area\AreaService;
use App\Services\Developer\DeveloperService;
use App\Services\Property\PropertyService;
use Illuminate\Http\Request;
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
        $developers = $this->developerService->getAllDevelopers();
        $areas = $this->areaService->getAllAreas();

        // dd($developers);
        // dd($areas);
        // dd($properties);

        return Inertia::render("Admin/Properties/AdminPropertyPage", [
            'properties' => $properties,
            'developers' => $developers,
            'areas' => $areas
        ]);
    }

    public function store(Request $request)
    {
        
    }
}
