<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Services\Property\PropertyService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{

    protected PropertyService $propertyService;

    public function __construct(PropertyService $propertyService)
    {
        $this->propertyService = $propertyService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Luxury Modern House',
                'description' => 'A luxurious house with modern architecture, located in a prime area.',
                'developer_id' => 1,
                'area_id' => 1,
                'user_id' => 2,
                'bathroom_count' => 3,
                'bedroom_count' => 4,
                'carport_count' => 2,
                'land_area' => 250.50,
                'building_area' => 180.75,
                'price' => 1500000000.00,
                'type' => 'sale',
                'status' => 'active',
                'address' => '123 Prime Street, Jakarta',
                'certificate_type' => 'SHM',
                'year_built' => 2021,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'title' => 'Cozy Apartment',
                'description' => 'A cozy apartment perfect for young professionals.',
                'developer_id' => 2,
                'area_id' => 2,
                'user_id' => 2,
                'bathroom_count' => 1,
                'bedroom_count' => 2,
                'carport_count' => 0,
                'land_area' => 0.00,
                'building_area' => 45.00,
                'price' => 500000000.00,
                'type' => 'rent',
                'status' => 'active',
                'address' => '456 City Tower, Surabaya',
                'certificate_type' => null,
                'year_built' => 2018,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'title' => 'Elegant Villa',
                'description' => 'An elegant villa surrounded by nature with a stunning view.',
                'developer_id' => 3,
                'area_id' => 3,
                'user_id' => 2,
                'bathroom_count' => 5,
                'bedroom_count' => 6,
                'carport_count' => 3,
                'land_area' => 500.00,
                'building_area' => 400.00,
                'price' => 2500000000.00,
                'type' => 'sale',
                'status' => 'sold',
                'address' => '789 Mountain Road, Bali',
                'certificate_type' => 'HGB',
                'year_built' => 2015,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'title' => 'Minimalist House',
                'description' => 'A minimalist house with a simple and elegant design.',
                'developer_id' => 4,
                'area_id' => 1,
                'user_id' => 2,
                'bathroom_count' => 2,
                'bedroom_count' => 3,
                'carport_count' => 1,
                'land_area' => 150.00,
                'building_area' => 120.00,
                'price' => 1200000000.00,
                'type' => 'sale',
                'status' => 'inactive',
                'address' => '101 Modern Street, Bandung',
                'certificate_type' => 'SHM',
                'year_built' => null,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
        ];        

        foreach($properties as $property){
            // $this->propertyService->create($property);
            Property::create($property);
        }
    }
}
