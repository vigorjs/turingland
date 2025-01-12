<?php

namespace App\Services\Developer;

use Illuminate\Http\Request;
use LaravelEasyRepository\BaseService;

interface DeveloperService extends BaseService{

    public function getAllDevelopers(Request $request);
    public function showDeveloper($id);
    public function storeDeveloper(Request $request);
    public function updateDeveloper(Request $request, $id);
    public function destroyDeveloper($id);
    // Write something awesome :)
}
