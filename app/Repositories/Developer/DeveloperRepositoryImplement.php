<?php

namespace App\Repositories\Developer;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Developer;

class DeveloperRepositoryImplement extends Eloquent implements DeveloperRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Developer $model;

    public function __construct(Developer $model)
    {
        $this->model = $model;
    }

    public function model()
    {
        return $this->model;
    }

    public function getAllDeveloper(){
        return $this->model()->all();
    }

    public function createDeveloper($data)
    {
        return $this->model->create($data);
    }

    public function updateDeveloper($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteCategory($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    // Write something awesome :)
}
