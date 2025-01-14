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
    public function index()
    {
        $properties = $this->propertyService->getAllProperty();

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
        Log::info('Request all:', $request->all());
        Log::info('Files:', $request->allFiles());
    
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
                
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                
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

    public function update(PropertyUpdateRequest $request, $id)
    {
        Log::info('Update Request:', $request->all());
        Log::info('Update Files:', $request->allFiles());
    
        // 1. Update property basic information
        $property = $this->propertyService->update(
            $id,
            array_merge(
                $request->except(['property_images', 'new_images', 'existing_images']),
                ['user_id' => Auth::id()]
            )
        );
    
        // 2. Handle existing images if any
        if ($request->has('existing_images')) {
            $existingImageIds = collect($request->existing_images)->pluck('id')->toArray();
            
            // Get all current images
            $currentImages = $this->propertyImageService->getImagesByPropertyId($id);
            
            // Delete images that are no longer in the existingImageIds array
            foreach ($currentImages as $image) {
                if (!in_array($image->id, $existingImageIds)) {
                    // Delete from storage
                    if (Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                    // Delete from database
                    $this->propertyImageService->deleteImage($image->id);
                }
            }
        }
    
        // 3. Handle new images
        if ($request->has('new_images')) {
            $currentImagesCount = $this->propertyImageService->getImagesByPropertyId($id)->count();
            
            foreach ($request->new_images as $index => $imageData) {
                if (!isset($imageData['file']) || !$imageData['file'] instanceof \Illuminate\Http\UploadedFile) {
                    continue;
                }
    
                $file = $imageData['file'];
                
                // Generate unique filename
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Store file
                $path = $file->storeAs('properties', $filename, 'public');
    
                // Create new image record
                $this->propertyImageService->create([
                    'property_id' => $id,
                    'image_path' => $path,
                    'is_primary' => $currentImagesCount === 0 && $index === 0,
                    'order' => $currentImagesCount + $index
                ]);
            }
        }
    
        return redirect()->route('dashboard.property');
    }

    public function delete($id) {
        $this->propertyService->delete($id);

        return redirect()->back();
    }
}
