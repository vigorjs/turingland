<?php

namespace App\Services\PropertyImage;

use LaravelEasyRepository\BaseService;

interface PropertyImageService extends BaseService{

    // Write something awesome :)
    public function createImage($image);
    public function getImagesByPropertyId($propertyId);
    public function updateImage($id, array $data);
    public function deleteImage($id);
}
