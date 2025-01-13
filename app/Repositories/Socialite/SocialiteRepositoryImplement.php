<?php

namespace App\Repositories\Socialite;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Socialite;
use Laravel\Socialite\Two\User;

class SocialiteRepositoryImplement extends Eloquent implements SocialiteRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Socialite $model;

    public function __construct(Socialite $model)
    {
        $this->model = $model;
    }

    // Write something awesome :)
    public function getSocialAccountByProvider(User $socialUser, string $provider)
    {
        return $this->model::where('provider_id', $socialUser->getId())
        ->where('provider_name', $provider)
        ->first();
    }
}
