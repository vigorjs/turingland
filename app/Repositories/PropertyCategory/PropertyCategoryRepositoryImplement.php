<?php

namespace App\Repositories\PropertyCategory;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\PropertyCategory;

class PropertyCategoryRepositoryImplement extends Eloquent implements PropertyCategoryRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected PropertyCategory $model;

    public function __construct(PropertyCategory $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
    public function createPropertyCategory($data){
        return $this->model->create($data);
    }

    public function getByPropertyId($id){
        return $this->model->where('property_id', $id)->get();
    }

    public function deleteWhere($propertyId, $categoryId){
        return $this->model
        ->where('property_id', $propertyId)
        ->where('category_id', $categoryId)
        ->delete();
    }

}
