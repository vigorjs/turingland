<?php

namespace App\Services\Property;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Property\PropertyRepository;

class PropertyServiceImplement extends ServiceApi implements PropertyService{

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
     protected PropertyRepository $mainRepository;

    public function __construct(PropertyRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
    public function getAllProperty(){
      return $this->mainRepository->getAllProperty();
    }
}
