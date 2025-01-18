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
                "name" => "Jakarta Barat",
                "description" => "Wilayah Jakarta yang terkenal dengan kawasan bisnis, pusat perbelanjaan, dan kawasan bersejarah seperti Kota Tua."
            ],
            [
                "name" => "Jakarta Timur",
                "description" => "Wilayah Jakarta yang memiliki banyak area permukiman, kawasan industri, serta Taman Mini Indonesia Indah."
            ],
            [
                "name" => "Jakarta Selatan",
                "description" => "Wilayah Jakarta yang dikenal dengan pusat bisnis modern, kafe, dan kawasan permukiman elit."
            ],
            [
                "name" => "Jakarta Utara",
                "description" => "Wilayah Jakarta yang mencakup kawasan pelabuhan, kawasan wisata Ancol, dan pusat perdagangan."
            ],
        ];

        foreach($areas as $area){
            Area::create($area);
        }
    }
}
