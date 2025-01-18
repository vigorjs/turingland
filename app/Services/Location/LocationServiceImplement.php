<?php

namespace App\Services\Location;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Location\LocationRepository;
use Illuminate\Http\Request;

class LocationServiceImplement extends ServiceApi implements LocationService{

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
     protected LocationRepository $mainRepository;

    public function __construct(LocationRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }


    public function getAllLocations(Request $request)
    {
        return $this->mainRepository->getAllLocations($request);
    }

    public function showLocation($id)
    {
        return $this->mainRepository->showLocation($id);
    }

    public function createLocation(Request $request)
    {
        $request->validate([
            "name" => "required",
            "area_id" => "required"
        ]);

        return $this->mainRepository->createLocation($request->all());
    }

    public function updateLocation(Request $request, $id)
    {
        $request->validate([
            "name" => "required",
            "area_id" => "required"
        ]);

        return $this->mainRepository->updateLocation($request->all(), $id);
    }

    public function deleteLocation($id)
    {
        return $this->mainRepository->deleteLocation($id);
    }

    // Define your custom methods :)
}
