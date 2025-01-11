<?php

namespace App\Repositories\WebPreferences;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\WebPreferences;

class WebPreferencesRepositoryImplement extends Eloquent implements WebPreferencesRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected $model;

    public function __construct(WebPreferences $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
    public function getByKey(string $key): ?WebPreferences
    {
        return $this->model->where('key', $key)->first();
    }

    public function createOrUpdate(string $key, string $value): WebPreferences
    {
        return $this->model->updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
