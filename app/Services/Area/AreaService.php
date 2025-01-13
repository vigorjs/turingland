<?php

namespace App\Services\Area;

use Illuminate\Http\Request;
use LaravelEasyRepository\BaseService;

interface AreaService extends BaseService{

    public function getAllAreas();
    public function showArea($id);
    public function createArea(Request $request);
    public function updateArea(Request $request, $id);
    public function deleteArea($id);

    // Write something awesome :)
}
