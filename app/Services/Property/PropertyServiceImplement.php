<?php

namespace App\Services\Property;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Property\PropertyRepository;
use App\Services\Category\CategoryService;
use App\Services\PropertyCategory\PropertyCategoryService;
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
  protected PropertyCategoryService $propertyCategoryService;

  public function __construct(PropertyRepository $mainRepository, PropertyImageService $propertyImageService, PropertyCategoryService $propertyCategoryService)
  {
    $this->mainRepository = $mainRepository;
    $this->propertyImageService = $propertyImageService;
    $this->propertyCategoryService = $propertyCategoryService;
  }

  // Define your custom methods :)
  public function getAllProperty($filters)
  {
    return $this->mainRepository->getAllProperty($filters);
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
      if (!isset($data['when_sold'])) {
        $data['when_sold'] = isset($data['status']) && $data['status'] === 'sold'
          ? now()
          : null;
      }

      $property = $this->mainRepository->create($data);

      if ($data['category_ids']) {
        foreach ($data['category_ids'] as $categoryId) {
          $this->propertyCategoryService->createPropertyCategory([
            'property_id' => $property->id,
            'category_id' => $categoryId
          ]);
        }
      }

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
      $existingProperty = $this->mainRepository->find($id);

      if (!isset($data['when_sold'])) {
        if (isset($data['status'])) {
          if ($data['status'] === 'sold' && $existingProperty->status !== 'sold') {
            $data['when_sold'] = now();
          } elseif ($data['status'] !== 'sold' && $existingProperty->status === 'sold') {
            $data['when_sold'] = null;
          }
        }
      }

      $property = $this->mainRepository->update($id, $data);

      if (isset($data['category_ids'])) {
        $currentCategories = $this->propertyCategoryService
          ->getByPropertyId($id)
          ->pluck('category_id')
          ->map(fn($id) => (string) $id)
          ->toArray();

        $newCategories = is_array($data['category_ids'])
          ? $data['category_ids']
          : explode(',', $data['category_ids']);

        $categoriesToAdd = array_diff($newCategories, $currentCategories);
        foreach ($categoriesToAdd as $categoryId) {
          $this->propertyCategoryService->createPropertyCategory([
            'property_id' => $id,
            'category_id' => $categoryId
          ]);
        }

        $categoriesToRemove = array_diff($currentCategories, $newCategories);
        foreach ($categoriesToRemove as $categoryId) {
          $this->propertyCategoryService->deleteWhere($id, $categoryId);
        }
      }

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
