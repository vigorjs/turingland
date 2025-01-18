<?php

namespace App\Services\PropertyCategory;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\PropertyCategory\PropertyCategoryRepository;

class PropertyCategoryServiceImplement extends ServiceApi implements PropertyCategoryService{

    /**
     * set title message api for CRUD
     * @param string $title
     */
     protected string $title = "";
     /**
     * uncomment this to override the default message
     * protected string $create_message = "";
     * protected string $update_message = "";
     * protected string $delete_message = "";
     */

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
     protected PropertyCategoryRepository $mainRepository;

    public function __construct(PropertyCategoryRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
    public function createPropertyCategory($data){
      return $this->mainRepository->createPropertyCategory($data);
    }

    public function getByPropertyId($id){
      return $this->mainRepository->getByPropertyId($id);
    }

    public function deleteWhere($propertyId, $categoryId){
      $this->mainRepository->deleteWhere($propertyId, $categoryId);
    }
}
