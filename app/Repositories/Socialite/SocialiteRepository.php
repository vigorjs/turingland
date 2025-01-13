<?php

namespace App\Repositories\Socialite;

use Laravel\Socialite\Two\User;
use LaravelEasyRepository\Repository;

interface SocialiteRepository extends Repository{

    // Write something awesome :)
    public function getSocialAccountByProvider(User $socialUser, string $provider);
}
