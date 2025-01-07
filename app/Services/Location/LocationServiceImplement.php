<?php

namespace App\Services\Location;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Location\LocationRepository;

class LocationServiceImplement extends ServiceApi implements LocationService{

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
     protected LocationRepository $mainRepository;

    public function __construct(LocationRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
