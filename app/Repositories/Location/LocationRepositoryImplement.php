<?php

namespace App\Repositories\Location;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Location;

class LocationRepositoryImplement extends Eloquent implements LocationRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Location $model;

    public function __construct(Location $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
}
