<?php

namespace App\Services\Banner;

use LaravelEasyRepository\BaseService;
use Illuminate\Http\Request;

interface BannerService extends BaseService{

    public function getAllBanners();
    public function createBanner(Request $request);
    public function updateBanner(Request $request, $id);
    public function showBanner($id);
    public function deleteBanner($id);

    // Write something awesome :)
}
