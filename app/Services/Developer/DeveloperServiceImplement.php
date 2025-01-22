<?php

namespace App\Services\Developer;

use App\Models\Developer;
use LaravelEasyRepository\ServiceApi;
use App\Repositories\Developer\DeveloperRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeveloperServiceImplement extends ServiceApi implements DeveloperService{

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
     protected DeveloperRepository $mainRepository;

    public function __construct(DeveloperRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }


    public function getAllDevelopers()
    {
        return $this->mainRepository->getAllDeveloper();
    }

    public function showDeveloper($id)
    {
        return $this->mainRepository->find($id);
    }

    public function storeDeveloper(Request $request)
    {
        $request->validate([
            "name" => "required",
        ]);

        $developer = new Developer();
        $developer->name = $request->input("name");
        $developer->description = $request->input("description");
        $developer->is_active = $request->input("is_active");

        if($request->hasFile("logo")) {
            $file = $request->file("logo");
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . "-" . $request->input("name") . "." . $ext;
            $path = $file->storeAs("developers", $fileName, "public");
            $developer->logo = $path;
        }

        return $developer->save();
    }

    public function updateDeveloper(Request $request, $id)
    {
        $request->validate([
            "name" => "required"
        ]);

        $developer = $this->showDeveloper($id);
        $developer->name = $request->input("name");
        $developer->description = $request->input("description");
        $developer->is_active = $request->input("is_active");

        if($request->hasFile("logo")) {
            if($developer->logo) Storage::delete($developer->logo);

            $file = $request->file("logo");
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . "-" . $request->input("name") . "." . $ext;
            $path = $file->storeAs("developers", $fileName, "public");
            $developer->logo = $path;
        }

        $data = [
            "name" => $developer->name,
            "description" => $developer->description,
            "logo" => $developer->logo,
            "is_active" => $developer->is_active
        ];

        return $this->mainRepository->updateDeveloper($data, $id);
    }

    public function destroyDeveloper($id)
    {
        $developer = $this->showDeveloper($id);

        if($developer->logo) {
            Storage::delete($developer->logo);
        }

        return $developer->delete();
    }
    // Define your custom methods :)
}
