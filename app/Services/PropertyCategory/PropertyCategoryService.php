<?php

namespace App\Services\PropertyCategory;

use LaravelEasyRepository\BaseService;

interface PropertyCategoryService extends BaseService{

    // Write something awesome :)
    public function createPropertyCategory($data);
    public function getByPropertyId($id);
    public function deleteWhere($propertyId, $categoryId);
}
