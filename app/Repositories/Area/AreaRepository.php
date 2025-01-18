<?php

namespace App\Repositories\Area;

use LaravelEasyRepository\Repository;

interface AreaRepository extends Repository{

    public function getAllAreas();
    public function showArea($id);
    public function createArea($data);
    public function updateArea($data, $id);
    public function deleteArea($id);
    // Write something awesome :)
}
