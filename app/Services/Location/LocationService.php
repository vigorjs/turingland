<?php

namespace App\Services\Location;

use Illuminate\Http\Request;
use LaravelEasyRepository\BaseService;

interface LocationService extends BaseService{

    public function getAllLocations(Request $request);
    public function showLocation($id);
    public function createLocation(Request $request);
    public function updateLocation(Request $request, $id);
    public function deleteLocation($id);
    // Write something awesome :)
}
