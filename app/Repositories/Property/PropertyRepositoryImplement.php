<?php

namespace App\Repositories\Property;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Property;
use Illuminate\Support\Arr;

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
    public function getAllProperty($filters){
        // dd($filters);
        
        return $this->model
        ->with(['developer', 'area'])
        ->filter($filters)
        ->paginate(10);
        // return $this->model->with(['developer', 'area'])->get();
    }

    public function getPropertyById($id){
        return $this->model->where('id', $id)->with('images')->get();
    }
}
