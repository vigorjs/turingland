<?php

namespace App\Services\Property;

use App\Http\Requests\PropertyCreateRequest;
use LaravelEasyRepository\BaseService;

interface PropertyService extends BaseService{

    // Write something awesome :)
    public function getAllProperty();
    public function createProperty($request);
}
