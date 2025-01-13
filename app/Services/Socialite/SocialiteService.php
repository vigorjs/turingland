<?php

namespace App\Services\Socialite;

use App\Models\User;
use LaravelEasyRepository\BaseService;

interface SocialiteService extends BaseService{

    // Write something awesome :)
    public function redirect(string $provider);

    public function callback(string $provider);
}
