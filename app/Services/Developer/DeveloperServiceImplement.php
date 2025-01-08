<?php

namespace App\Services\Developer;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Developer\DeveloperRepository;

class DeveloperServiceImplement extends ServiceApi implements DeveloperService{

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
     protected DeveloperRepository $mainRepository;

    public function __construct(DeveloperRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
