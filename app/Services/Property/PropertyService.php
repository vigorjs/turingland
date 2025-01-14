<?php

namespace App\Services\Property;

use App\Http\Requests\PropertyCreateRequest;
use LaravelEasyRepository\BaseService;

interface PropertyService extends BaseService{

    // Write something awesome :)
    public function getAllProperty();
    public function createProperty($request);
    public function getPropertyById($id);
    public function createPropertyWithImages($data, $propertyImages = null);
    public function updatePropertyWithImages($id, $data, $newImages = null, $existingImages = null);
}
