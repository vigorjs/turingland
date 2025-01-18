<?php

namespace App\Services\PropertyImage;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\PropertyImage\PropertyImageRepository;

class PropertyImageServiceImplement extends ServiceApi implements PropertyImageService
{

  /**
   * set title message api for CRUD
   * @param string $title
   */
  protected string $title = "";
  /**
   * uncomment this to override the default message
   * protected string $create_message = "";
   * protected string $update_message = "";
   * protected string $delete_message = "";
   */

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected PropertyImageRepository $mainRepository;

  public function __construct(PropertyImageRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  // Define your custom methods :)
  public function createImage($image)
  {
    return $this->mainRepository->createImage($image);
  }

  public function getImagesByPropertyId($propertyId) 
  {
    return $this->mainRepository->getImagesByPropertyId($propertyId);
  }

  public function updateImage($id, array $data) 
  {
    return $this->mainRepository->updateImage($id, $data);
  }
  public function deleteImage($id) {
    return $this->mainRepository->deleteImage($id);
  }
}
