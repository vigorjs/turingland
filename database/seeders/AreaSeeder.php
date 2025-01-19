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
                'name' => 'Central Park',
                'description' => 'A beautiful park located in the city center.',
                'is_active' => true,
                "location_id" => 1,
            ],
            [
                'name' => 'Downtown District',
                'description' => 'The main business and entertainment area.',
                'is_active' => true,
                "location_id" => 2,
            ],
            [
                'name' => 'Riverside',
                'description' => 'A peaceful area next to the river with stunning views.',
                'is_active' => true,
                "location_id" => 3,
            ],
            [
                'name' => 'Historic Quarter',
                'description' => 'An area rich in history with many landmarks.',
                'is_active' => true,
                "location_id" => 4,
            ],
            [
                'name' => 'Industrial Zone',
                'description' => 'A zone designated for industrial use.',
                'is_active' => false,
                "location_id" => 1,
            ],
            [
                'name' => 'Suburban Neighborhood',
                'description' => 'A quiet residential area outside the city center.',
                'is_active' => true,
                "location_id" => 2,
            ],
            [
                'name' => 'Mountain Retreat',
                'description' => 'A remote area surrounded by mountains.',
                'is_active' => true,
                "location_id" => 3,
            ],
            [
                'name' => 'Beachside',
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
