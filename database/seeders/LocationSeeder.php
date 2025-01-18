<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Data lokasi yang akan dimasukkan
        $locations = [
            [
                'name' => 'Central Park',
                'description' => 'A beautiful park located in the city center.',
                'is_active' => true,
                'area_id' => 1,
            ],
            [
                'name' => 'Downtown District',
                'description' => 'The main business and entertainment area.',
                'is_active' => true,
                'area_id' => 2,
            ],
            [
                'name' => 'Riverside',
                'description' => 'A peaceful area next to the river with stunning views.',
                'is_active' => true,
                'area_id' => 3,
            ],
            [
                'name' => 'Historic Quarter',
                'description' => 'An area rich in history with many landmarks.',
                'is_active' => true,
                'area_id' => 4,
            ],
            [
                'name' => 'Industrial Zone',
                'description' => 'A zone designated for industrial use.',
                'is_active' => false,
                'area_id' => 1,
            ],
            [
                'name' => 'Suburban Neighborhood',
                'description' => 'A quiet residential area outside the city center.',
                'is_active' => true,
                'area_id' => 2,
            ],
            [
                'name' => 'Mountain Retreat',
                'description' => 'A remote area surrounded by mountains.',
                'is_active' => true,
                'area_id' => 3,
            ],
            [
                'name' => 'Beachside',
                'description' => 'A popular destination by the beach.',
                'is_active' => true,
                'area_id' => 4,
            ],
        ];

        // Memasukkan data ke tabel locations
        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
