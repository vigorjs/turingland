<?php

namespace App\Services\Area;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Area\AreaRepository;

class AreaServiceImplement extends ServiceApi implements AreaService{

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
     protected AreaRepository $mainRepository;

    public function __construct(AreaRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
