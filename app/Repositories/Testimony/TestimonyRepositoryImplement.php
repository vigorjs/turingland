<?php

namespace App\Repositories\Testimony;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Testimony;

class TestimonyRepositoryImplement extends Eloquent implements TestimonyRepository
{
    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected Testimony $model;

    public function __construct(Testimony $model)
    {
        $this->model = $model;
    }

    /**
     * Retrieve all testimonies
     */
    public function getAllTestimonies()
    {
        return $this->model->all();
    }

    /**
     * Create a new testimony
     * @param array $data
     * @return Testimony
     */
    public function createTestimony($data)
    {
        return $this->model->create($data);
    }

    /**
     * Retrieve a specific testimony by ID
     * @param int|string $id
     * @return Testimony|null
     */
    public function showTestimony($id)
    {
        return $this->model->find($id);
    }

    /**
     * Update a testimony
     * @param array $data
     * @param int|string $id
     * @return bool
     */
    public function updateTestimony($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * Delete a testimony by ID
     * @param int|string $id
     * @return bool|null
     */
    public function deleteTestimony($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
