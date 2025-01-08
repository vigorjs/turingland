<?php

namespace App\Repositories\Property;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Property;

class PropertyRepositoryImplement extends Eloquent implements PropertyRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Property $model;

    public function __construct(Property $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
}
