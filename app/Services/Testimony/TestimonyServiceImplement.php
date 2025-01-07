<?php

namespace App\Services\Testimony;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Testimony\TestimonyRepository;

class TestimonyServiceImplement extends ServiceApi implements TestimonyService{

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
     protected TestimonyRepository $mainRepository;

    public function __construct(TestimonyRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
