<?php

namespace App\Services\WebPreferences;

use Illuminate\Http\Request;
use LaravelEasyRepository\BaseService;

interface WebPreferencesService extends BaseService{

    // Write something awesome :)
    public function getWebPreference(string $key): ?string;
    public function updateWebPreference(Request $request): array;
}
