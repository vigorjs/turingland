<?php

namespace App\Repositories\Banner;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Banner;

class BannerRepositoryImplement extends Eloquent implements BannerRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Banner $model;

    public function __construct(Banner $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
}
