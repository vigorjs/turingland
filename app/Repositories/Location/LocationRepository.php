<?php

namespace App\Repositories\Location;

use LaravelEasyRepository\Repository;

interface LocationRepository extends Repository{

    public function getAllLocations($request);
    public function showLocation($id);
    public function createLocation($data);
    public function updateLocation($data, $id);
    public function deleteLocation($id);
    // Write something awesome :)
}
