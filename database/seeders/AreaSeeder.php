<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = [
            [
                'name' => 'PIK Jakarta',
                'description' => 'A beautiful park located in the city center.',
                'is_active' => true,
                "location_id" => 1,
            ],
            [
                'name' => 'SCBD',
                'description' => 'The main business and entertainment area.',
                'is_active' => true,
                "location_id" => 2,
            ],
            [
                'name' => 'Ragunan',
                'description' => 'A peaceful area next to the river with stunning views.',
                'is_active' => true,
                "location_id" => 3,
            ],
            [
                'name' => 'Sudirman',
                'description' => 'An area rich in history with many landmarks.',
                'is_active' => true,
                "location_id" => 4,
            ],
            [
                'name' => 'Karawang',
                'description' => 'A zone designated for industrial use.',
                'is_active' => false,
                "location_id" => 1,
            ],
            [
                'name' => 'Puncak',
                'description' => 'A quiet residential area outside the city center.',
                'is_active' => true,
                "location_id" => 2,
            ],
            [
                'name' => 'Gunung Muria',
                'description' => 'A remote area surrounded by mountains.',
                'is_active' => true,
                "location_id" => 3,
            ],
            [
                'name' => 'PIK Selatan',
                'description' => 'A popular destination by the beach.',
                'is_active' => true,
                "location_id" => 4,
            ],
        ];

        foreach($areas as $area){
            Area::create($area);
        }
    }
}
