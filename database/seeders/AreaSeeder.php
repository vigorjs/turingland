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
                "name" => "Jakarta Barat"
            ],
            [
                "name" => "Jakarta Timur"
            ],
            [
                "name" => "Jakarta Selatan"
            ],
            [
                "name" => "Jakarta Utara"
            ],
        ];

        foreach($areas as $area){
            Area::create($area);
        }
    }
}
