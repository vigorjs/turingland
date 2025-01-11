<?php
namespace App\Http\Controllers;

use App\Services\WebPreferences\WebPreferencesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebPreferencesController extends Controller
{
    protected $webPreferencesService;

    public function __construct(WebPreferencesService $webPreferencesService)
    {
        $this->webPreferencesService = $webPreferencesService;
    }

    // Endpoint untuk mendapatkan preferensi berdasarkan key
    public function getWebPreference(string $key)
    {
        Log::info('Received request to get web preference', ['key' => $key]);

        $value = $this->webPreferencesService->getWebPreference($key);

        if ($value) {
            Log::info('Web preference retrieved successfully', ['key' => $key, 'value' => $value]);

            return response()->json([
                'success' => true,
                'key' => $key,
                'value' => $value
            ]);
        }

        Log::warning('Web preference not found', ['key' => $key]);

        return response()->json([
            'success' => false,
            'message' => 'Web preference not found.'
        ], 404);
    }

    // Endpoint untuk memperbarui preferensi berdasarkan key
    public function updateWebPreference(Request $request)
{

    // Call the service to update the preference with the key and the stored file path or string value
    $result = $this->webPreferencesService->updateWebPreference($request);

    if ($result['success']) {

        return response()->json([
            'message' => $result['message'],
            'data' => $result['data']
        ]);
    }

    return response()->json([
        'message' => 'Failed to update web preference.'
    ], 400);
}
}
