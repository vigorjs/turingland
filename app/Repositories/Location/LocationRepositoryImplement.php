<?php

namespace App\Repositories\Location;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Location;
use Illuminate\Http\Request;

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

    public function getAllLocations($request)
    {
        return $this->model->all();
    }

    public function showLocation($id)
    {
        return $this->model->where("id", $id)->with("area")->first();
    }

    public function createLocation($data)
    {
        return $this->model->create($data);
    }

    public function updateLocation($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteLocation($id)
    {
        return $this->model->where('id', $id)->delete();
    }
    // Write something awesome :)
}
