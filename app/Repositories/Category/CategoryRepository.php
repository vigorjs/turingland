<?php

namespace App\Repositories\Category;

use LaravelEasyRepository\Repository;

interface CategoryRepository extends Repository{

    public function getAllCategories();
    public function createCategory($data);
    public function updateCategory($data, $id);
    public function showCategory($id);
    public function deleteCategory($id);
    // Write something awesome :)
}
