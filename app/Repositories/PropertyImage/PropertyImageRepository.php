<?php

namespace App\Repositories\PropertyImage;

use LaravelEasyRepository\Repository;

interface PropertyImageRepository extends Repository{

    // Write something awesome :)
    public function createImage($images);
    public function getImagesByPropertyId($propertyId);
    public function updateImage($id, array $data);
    public function deleteImage($id);
}
