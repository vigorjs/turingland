<?php

namespace App\Services\Area;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Area\AreaRepository;
use Illuminate\Http\Request;

class AreaServiceImplement extends ServiceApi implements AreaService{

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
     protected AreaRepository $mainRepository;

    public function __construct(AreaRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    public function getAllAreas()
    {
        return $this->mainRepository->all();
    }

    public function showArea($id)
    {
        return $this->mainRepository->find($id);
    }

    public function createArea(Request $request)
    {
        $request->validate([
            "name" => "required",
            "location_id" => "required"
        ]);

        return $this->mainRepository->createArea($request->all());
    }

    public function updateArea(Request $request, $id)
    {
        $request->validate([
            "name" => "required",
            "location_id" => "required"
        ]);

        return $this->mainRepository->updateArea($request->all(), $id);
    }

    public function deleteArea($id)
    {
        return $this->mainRepository->deleteArea($id);
    }

    // Define your custom methods :)
}
