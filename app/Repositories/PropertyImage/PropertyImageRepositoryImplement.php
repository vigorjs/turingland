<?php

namespace App\Repositories\PropertyImage;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\PropertyImage;

class PropertyImageRepositoryImplement extends Eloquent implements PropertyImageRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected PropertyImage $model;

    public function __construct(PropertyImage $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)

    public function createImage($image)
    {
        $this->model->create($image);
    }

    public function getImagesByPropertyId($propertyId)
    {
        return $this->model->where('property_id', $propertyId)
                           ->orderBy('order')
                           ->get();
    }
    public function updateImage($id, array $data)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function deleteImage($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
