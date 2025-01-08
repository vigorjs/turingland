<?php

namespace App\Services\Banner;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Banner\BannerRepository;

class BannerServiceImplement extends ServiceApi implements BannerService{

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
     protected BannerRepository $mainRepository;

    public function __construct(BannerRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
