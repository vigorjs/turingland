<?php

namespace Database\Seeders;

use App\Models\PropertyCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyCategories = [
            [
                "property_id" => 1,
                "category_id" => 1,
            ],
            [
                "property_id" => 1,
                "category_id" => 2,
            ],
            [
                "property_id" => 1,
                "category_id" => 3,
            ],
            [
                "property_id" => 2,
                "category_id" => 4,
            ],
            [
                "property_id" => 2,
                "category_id" => 5,
            ],
        ];

        foreach($propertyCategories as $propertyCategory){
            PropertyCategory::create($propertyCategory);
        }
    }
}
