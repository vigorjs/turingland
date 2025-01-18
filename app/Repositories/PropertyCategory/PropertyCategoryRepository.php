<?php

namespace App\Repositories\PropertyCategory;

use LaravelEasyRepository\Repository;

interface PropertyCategoryRepository extends Repository{

    // Write something awesome :)
    public function createPropertyCategory($data);
    public function getByPropertyId($id);
    public function deleteWhere($propertyId, $categoryId);
}
