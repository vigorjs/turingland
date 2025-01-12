<?php

namespace App\Repositories\Category;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Category;

class CategoryRepositoryImplement extends Eloquent implements CategoryRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Category $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }

    public function getAllCategories()
    {
        return $this->model->all();
    }

    public function createCategory($data)
    {
        return $this->model->create($data);
    }

    public function showCategory($id)
    {
        return $this->model->where('id', $id)->with('properties')->first();
    }

    public function updateCategory($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteCategory($id)
    {
        return $this->model->where('id', $id)->delete();
    }
    // Write something awesome :)
}
