<?php

namespace App\Services\Socialite;

use App\Models\User;
use LaravelEasyRepository\ServiceApi;
use App\Repositories\Socialite\SocialiteRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class SocialiteServiceImplement extends ServiceApi implements SocialiteService{

    /**
     * set title message api for CRUD
     * @param string $title
     */
     protected string $title = "";
     /**
     * uncomment this to override the default message
     * protected string $create_message = "";
     * protected string $update_message = "";
     * protected string $delete_message = "";
     */

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
     protected SocialiteRepository $mainRepository;
     protected Auth $auth;
     protected User $userModel;
     protected Socialite $socialite;

    public function __construct(SocialiteRepository $mainRepository, Auth $auth, User $userModel, Socialite $socialite)
    {
      $this->mainRepository = $mainRepository;
      $this->auth = $auth;
      $this->userModel = $userModel;
      $this->socialite = $socialite;
    }

    // Define your custom methods :)
    public function redirect($provider){
        return Inertia::location($this->socialite::driver($provider)->redirect());
    }

    public function callback($provider){
        $socialUser = $this->socialite::driver($provider)->stateless()->user();

        $authUser = $this->store($socialUser, $provider);

        $this->auth::login($authUser);
        return to_route('dashboard');
    }

    private function store($socialUser, $provider) {
        $socialAccount = $this->mainRepository->getSocialAccountByProvider($socialUser, $provider);

        if(!$socialAccount) {
            $user = $this->userModel::where('email', $socialUser->getEmail())->first();
            if(!$user){
                $user = $this->userModel::updateOrCreate([
                    'name' => $socialUser->getName() ? $socialUser->getName() : $socialUser->getNickname(),
                    'email' => $socialUser->getEmail(),
                ]);
            }

            $user->socialite()->create([
                'provider_id' => $socialUser->getId(),
                'provider_name' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);
            $user->assignRole('customer');

            return $user;
        }
        return $socialAccount->user;
    }
}
