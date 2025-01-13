<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Socialite\SocialiteService;

class SocialiteController extends Controller
{
    protected SocialiteService $socialiteService;

    public function __construct(SocialiteService $socialiteService)
    {
      $this->socialiteService = $socialiteService;
    }

    public function redirect(string $provider){
        return $this->socialiteService->redirect($provider);
    }

    public function callback(string $provider){
        return $this->socialiteService->callback($provider);
    }
}
