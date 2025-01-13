<?php

namespace App\Repositories\Developer;

use LaravelEasyRepository\Repository;

interface DeveloperRepository extends Repository{

    public function model();
    public function getAllDeveloper();
    public function createDeveloper($data);
    public function updateDeveloper($data, $id);
    public function deleteCategory($id);

    // Write something awesome :)
}
