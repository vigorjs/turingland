<?php

namespace App\Services\Banner;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Banner\BannerRepository;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class BannerServiceImplement extends ServiceApi implements BannerService
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
    protected BannerRepository $mainRepository;

    public function __construct(BannerRepository $mainRepository)
    {
        $this->mainRepository = $mainRepository;
    }

    public function getAllBanners()
    {
        return $this->mainRepository->getAllBanners();
    }

    public function createBanner(Request $request)
    {
        $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'image_path' => "required|mimes:png,jpg,jpeg|max:2048",
            'link' => "nullable|url|max:255",
            'order' => "nullable|integer|min:0",
            'is_active' => "nullable|boolean",
        ]);

        $data = [
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'link' => $request->input('link'),
            'order' => $request->input('order', 0), // Default ke 0 jika tidak diisi
            'is_active' => $request->boolean('is_active', true), // Default ke true jika tidak diisi
            'image_path' => null, // Placeholder untuk path gambar
        ];

        // Menyimpan file gambar
        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '-' . $data['title'] . '.' . $ext;
            $path = $file->storeAs('banners', $fileName, "public");
            $data['image_path'] = $path;
        }

        // Simpan data ke repository atau model
        return $this->mainRepository->createBanner($data);
    }

    public function showBanner($id)
    {
        return $this->mainRepository->showBanner($id);
    }

    public function updateBanner(Request $request, $id)
    {
        $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'image_path' => "nullable|mimes:png,jpg,jpeg|max:2048",
            'link' => "nullable|url|max:255",
            'order' => "nullable|integer|min:0",
            'is_active' => "nullable|boolean",
        ]);

        // Ambil data banner dari repository
        $banner = $this->mainRepository->showBanner($id);

        // Update fields directly on the $banner object
        $banner->title = $request->input('title');
        $banner->description = $request->input('description');
        $banner->link = $request->input('link');
        $banner->order = $request->input('order', $banner->order ?? 0);
        $banner->is_active = $request->boolean('is_active', $banner->is_active ?? true);

        // Jika ada file gambar baru
        if ($request->hasFile('image_path')) {
            // Hapus gambar lama jika ada
            if ($banner->image_path) {
                Storage::delete($banner->image_path);
            }

            // Simpan gambar baru
            $file = $request->file('image_path');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '-' . $banner->title . '.' . $ext;
            $path = $file->storeAs('banners', $fileName, "public");
            $banner->image_path = $path;
        }

        $data = [
            'title' => $banner->title,
            'description' => $banner->description,
            'link' => $banner->link,
            'order' => $banner->order,
            'is_active' => $banner->is_active,
            'image_path' => $banner->image_path,
        ];

        // Update data di repository
        return $this->mainRepository->updateBanner($data, $id);
    }

    public function deleteBanner($id)
    {
        $data = $this->mainRepository->showBanner($id);

        if ($data->image_path) {
            Storage::delete($data->image_path);
        }

        return $this->mainRepository->deleteBanner($id);
    }

    // Define your custom methods :)
}
