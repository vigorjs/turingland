<?php

namespace App\Services\WebPreferences;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\WebPreferences\WebPreferencesRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebPreferencesServiceImplement extends ServiceApi implements WebPreferencesService
{
    protected $repository;

    public function __construct(WebPreferencesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getWebPreference(string $key): ?string
    {
        // Log the action of retrieving the web preference
        Log::info('Attempting to retrieve web preference', ['key' => $key]);

        $webPreference = $this->repository->getByKey($key);

        if ($webPreference) {
            Log::info('Web preference retrieved successfully', ['key' => $key, 'value' => $webPreference->value]);
        } else {
            Log::warning('Web preference not found', ['key' => $key]);
        }

        return $webPreference ? $webPreference->value : null;
    }

    public function updateWebPreference(Request $request): array
{
    $request->validate([
        'key' => 'required|string',
        'value' => 'required', // This can be either a file or a regular string
    ]);

    $key = $request->input('key');
    $value = $request->input('value');

    Log::info('Received request to update web preference', ['key' => $key, 'value' => $value]);

    // Check if 'value' is a file
    if ($request->hasFile('value')) {
        $file = $request->file('value');

        // Ensure the file is valid
        if ($file->isValid()) {
            // Store the file with the same name as the key (adding extension from the uploaded file)
            $fileExtension = $file->getClientOriginalExtension();
            $fileName = $key . '.' . $fileExtension; // Use key as filename
            $storedPath = $file->storeAs('web-preferences', $fileName, 'public'); // Store file in 'web-preferences' directory under the 'public' disk

            // Now assign the file path to $value
            $value = $storedPath;
        } else {
            Log::error('File upload failed', ['key' => $key]);
            return response()->json([
                'message' => 'File upload failed.'
            ], 400);
        }
    }

    // Log the action of updating the web preference
    Log::info('Attempting to update web preference', ['key' => $key, 'value' => $value]);

    // Update the web preference in the repository
    $webPreference = $this->repository->createOrUpdate($key, $value);

    Log::info('Web preference updated successfully', ['key' => $key, 'value' => $value]);

    return [
        'success' => true,
        'message' => 'Web preference updated successfully.',
        'data' => $webPreference,
    ];
}

}
