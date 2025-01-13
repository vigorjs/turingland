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

    public function getAllAreas()
    {
        return $this->model->all();
    }

    public function showArea($id)
    {
        return $this->model->find($id);
    }

    public function createArea($data)
    {
        return $this->model->create($data);
    }

    public function updateArea($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteArea($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    // Write something awesome :)
}
