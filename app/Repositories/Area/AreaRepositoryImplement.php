<?php

namespace App\Repositories\Area;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Area;

class AreaRepositoryImplement extends Eloquent implements AreaRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Area $model;

    public function __construct(Area $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
}
