<?php

namespace App\Services\Testimony;

use LaravelEasyRepository\BaseService;
use Illuminate\Http\Request;

interface TestimonyService extends BaseService{

    public function getAllTestimonies();
    public function createTestimony(Request $request);
    public function updateTestimony(Request $request, $id);
    public function showTestimony($id);
    public function deleteTestimony($id);

    // Write something awesome :)
}
