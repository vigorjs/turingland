<?php

namespace App\Repositories\WebPreferences;

use App\Models\WebPreferences;
use LaravelEasyRepository\Repository;

interface WebPreferencesRepository extends Repository{

    // Write something awesome :)
    public function getByKey(string $key): ?WebPreferences;
    public function createOrUpdate(string $key, string $value): WebPreferences;
}
