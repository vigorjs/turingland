<?php

namespace App\Repositories\Banner;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Banner;

class BannerRepositoryImplement extends Eloquent implements BannerRepository
{
    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected Banner $model;

    public function __construct(Banner $model)
    {
        $this->model = $model;
    }

    /**
     * Retrieve all banners
     */
    public function getAllBanners()
    {
        return $this->model->all();
    }

    /**
     * Create a new banner
     * @param array $data
     * @return Banner
     */
    public function createBanner($data)
    {
        return $this->model->create($data);
    }

    /**
     * Retrieve a specific banner by ID
     * @param int|string $id
     * @return Banner|null
     */
    public function showBanner($id)
    {
        return $this->model->find($id);
    }

    /**
     * Update a banner
     * @param array $data
     * @param int|string $id
     * @return bool
     */
    public function updateBanner($data, $id)
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * Delete a banner by ID
     * @param int|string $id
     * @return bool|null
     */
    public function deleteBanner($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
