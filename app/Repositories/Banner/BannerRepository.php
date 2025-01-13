<?php

namespace App\Repositories\Banner;

use LaravelEasyRepository\Repository;

interface BannerRepository extends Repository{

    public function getAllBanners();
    public function createBanner($data);
    public function updateBanner($data, $id);
    public function showBanner($id);
    public function deleteBanner($id);

    // Write something awesome :)
}
