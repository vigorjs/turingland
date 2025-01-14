<?php

namespace App\Services\Testimony;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Testimony\TestimonyRepository;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class TestimonyServiceImplement extends ServiceApi implements TestimonyService
{
    protected string $title = "";
    protected TestimonyRepository $mainRepository;

    public function __construct(TestimonyRepository $mainRepository)
    {
        $this->mainRepository = $mainRepository;
    }

    public function getAllTestimonies()
    {
        return $this->mainRepository->getAllTestimonies();
    }

    public function createTestimony(Request $request)
    {
        $request->validate([
            'client_name' => "required|string|max:255",
            'client_avatar' => "nullable|mimes:png,jpg,jpeg|max:2048",
            'content' => "required|string",
            'rating' => "required|integer|min:1|max:5",
            'is_active' => "nullable|boolean",
        ]);

        $data = [
            'client_name' => $request->input('client_name'),
            'content' => $request->input('content'),
            'rating' => $request->input('rating'),
            'is_active' => $request->boolean('is_active', true),
            'client_avatar' => null, // Placeholder untuk path avatar
        ];

        // Menyimpan file avatar
        if ($request->hasFile('client_avatar')) {
            $file = $request->file('client_avatar');
            $fileName = time() . '-' . $data['client_name'] . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('testimonies', $fileName, "public");
            $data['client_avatar'] = $path;
        }

        return $this->mainRepository->createTestimony($data);
    }

    public function showTestimony($id)
    {
        return $this->mainRepository->showTestimony($id);
    }

    public function updateTestimony(Request $request, $id)
    {
        $request->validate([
            'client_name' => "required|string|max:255",
            'client_avatar' => "nullable|mimes:png,jpg,jpeg|max:2048",
            'content' => "required|string",
            'rating' => "required|integer|min:1|max:5",
            'is_active' => "nullable|boolean",
        ]);

        $testimony = $this->mainRepository->showTestimony($id);

        $testimony->client_name = $request->input('client_name');
        $testimony->content = $request->input('content');
        $testimony->rating = $request->input('rating');
        $testimony->is_active = $request->boolean('is_active', $testimony->is_active ?? true);

        if ($request->hasFile('client_avatar')) {
            if ($testimony->client_avatar) {
                Storage::delete($testimony->client_avatar);
            }

            $file = $request->file('client_avatar');
            $fileName = time() . '-' . $testimony->client_name . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('testimonies', $fileName, "public");
            $testimony->client_avatar = $path;
        }

        $data = [
            'client_name' => $testimony->client_name,
            'content' => $testimony->content,
            'rating' => $testimony->rating,
            'is_active' => $testimony->is_active,
            'client_avatar' => $testimony->client_avatar,
        ];

        return $this->mainRepository->updateTestimony($data, $id);
    }

    public function deleteTestimony($id)
    {
        $testimony = $this->mainRepository->showTestimony($id);

        if ($testimony->client_avatar) {
            Storage::delete($testimony->client_avatar);
        }

        return $this->mainRepository->deleteTestimony($id);
    }
}
