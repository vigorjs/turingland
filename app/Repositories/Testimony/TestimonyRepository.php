<?php

namespace App\Repositories\Testimony;

use LaravelEasyRepository\Repository;

interface TestimonyRepository extends Repository{

    public function getAllTestimonies();
    public function createTestimony($data);
    public function updateTestimony($data, $id);
    public function showTestimony($id);
    public function deleteTestimony($id);

    // Write something awesome :)
}
