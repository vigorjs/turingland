<?php

namespace App\Services\Property;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Property\PropertyRepository;
use App\Services\PropertyImage\PropertyImageService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PropertyServiceImplement extends ServiceApi implements PropertyService
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
  protected PropertyRepository $mainRepository;
  protected PropertyImageService $propertyImageService;


  public function __construct(PropertyRepository $mainRepository, PropertyImageService $propertyImageService)
  {
    $this->mainRepository = $mainRepository;
    $this->propertyImageService = $propertyImageService;
  }

  // Define your custom methods :)
  public function getAllProperty()
  {
    return $this->mainRepository->getAllProperty();
  }

  public function createProperty($request)
  {
    return $this->mainRepository->create($request);
  }

  public function getPropertyById($id)
  {
    return $this->mainRepository->getPropertyById($id);
  }

  public function createPropertyWithImages($data, $propertyImages = null)
  {
    Log::info('Request all:', $data);
    Log::info('Files:', isset($propertyImages) ? $propertyImages : []);

    return DB::transaction(function () use ($data, $propertyImages) {
      $property = $this->mainRepository->create($data);

      if ($propertyImages) {
        foreach ($propertyImages as $index => $imageData) {
          if (!isset($imageData['file']) || !$imageData['file'] instanceof \Illuminate\Http\UploadedFile) {
            continue;
          }

          $file = $imageData['file'];
          $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
          $path = $file->storeAs('properties', $filename, 'public');

          $this->propertyImageService->create([
            'property_id' => $property->id,
            'image_path' => $path,
            'is_primary' => $index === 0,
            'order' => $index
          ]);
        }
      }

      return $property;
    });
  }

  public function updatePropertyWithImages($id, $data, $newImages = null, $existingImages = null)
  {
    Log::info('Update Request:', $data);
    Log::info('Update Files:', isset($newImages) ? $newImages : []);

    return DB::transaction(function () use ($id, $data, $newImages, $existingImages) {
      $property = $this->mainRepository->update($id, $data);

      if ($existingImages !== null) {
        $existingImageIds = collect($existingImages)->pluck('id')->toArray();
        $currentImages = $this->propertyImageService->getImagesByPropertyId($id);

        foreach ($currentImages as $image) {
          if (!in_array($image->id, $existingImageIds)) {
            if (Storage::disk('public')->exists($image->image_path)) {
              Storage::disk('public')->delete($image->image_path);
            }
            $this->propertyImageService->deleteImage($image->id);
          }
        }
      }

      if ($newImages) {
        $currentImagesCount = $this->propertyImageService->getImagesByPropertyId($id)->count();

        foreach ($newImages as $index => $imageData) {
          if (!isset($imageData['file']) || !$imageData['file'] instanceof \Illuminate\Http\UploadedFile) {
            continue;
          }

          $file = $imageData['file'];
          $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
          $path = $file->storeAs('properties', $filename, 'public');

          $this->propertyImageService->create([
            'property_id' => $id,
            'image_path' => $path,
            'is_primary' => $currentImagesCount === 0 && $index === 0,
            'order' => $currentImagesCount + $index
          ]);
        }
      }

      return $property;
    });
  }
}
