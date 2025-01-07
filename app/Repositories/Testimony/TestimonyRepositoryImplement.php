<?php

namespace App\Repositories\Testimony;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Testimony;

class TestimonyRepositoryImplement extends Eloquent implements TestimonyRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Testimony $model;

    public function __construct(Testimony $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
}
