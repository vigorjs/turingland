<?php

namespace App\Services\Category;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Category\CategoryRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CategoryServiceImplement extends ServiceApi implements CategoryService{

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
     protected CategoryRepository $mainRepository;

    public function __construct(CategoryRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }


    public function getAllCategories()
    {
        // return $this->mainRepository->with('properties')->get();
        return $this->mainRepository->getAllCategories();
    }

    public function createCategory(Request $request)
    {
        $request->validate([
            'name' => "required|unique:categories,name",
            'icon' => "nullable|mimes:png,jpg,jpeg",
        ]);

        $data = (object) [
            'name' => $request->input('name'),
            'icon' =>  null
        ];

        // Log::info($data);

        if($request->hasFile('icon')) {
            $file = $request->file('icon');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '-' . $data->name . '.' . $ext;
            $path = $file->storeAs('categories', $fileName, "public");
            $data->icon = $path;
        }

        return $this->mainRepository->createCategory((array) $data);
    }

    public function showCategory($id)
    {
        return $this->mainRepository->showCategory($id);
    }

    public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name' => "required|unique:categories,name,$id",
            'icon' => "nullable|mimes:png,jpg,jpeg",
        ]);

        $category = $this->mainRepository->showCategory($id);
        $data = (object) [
            'name' => $request->input('name'),
            'icon' => $category->icon,
        ];

        if($request->hasFile('icon')) {
            if($data->icon) {
                Storage::delete($data->icon);
            }

            $file = $request->file('icon');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '-' . $data->name . '.' . $ext;
            $path = $file->storeAs('categories', $fileName, "public");
            $data->icon = $path;
        }

        $data->name = $request->input('name');

        return $this->mainRepository->updateCategory((array) $data, $id);
    }

    public function deleteCategory($id)
    {
        $data = $this->mainRepository->showCategory($id);

        if($data->icon) {
            Storage::delete($data->icon);
        }

        return $this->mainRepository->deleteCategory($id);
    }

    // Define your custom methods :)
}
