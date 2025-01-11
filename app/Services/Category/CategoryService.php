<?php

namespace App\Services\Category;

use LaravelEasyRepository\BaseService;
use Illuminate\Http\Request;
interface CategoryService extends BaseService{


    public function getAllCategories();
    public function createCategory(Request $request);
    public function updateCategory(Request $request, $id);
    public function showCategory($id);
    public function deleteCategory($id);
    // Write something awesome :)
}
