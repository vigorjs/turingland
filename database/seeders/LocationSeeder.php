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
                "name" => "Jakarta Barat",
                "description" => "Wilayah Jakarta yang terkenal dengan kawasan bisnis, pusat perbelanjaan, dan kawasan bersejarah seperti Kota Tua.",
            ],
            [
                "name" => "Jakarta Timur",
                "description" => "Wilayah Jakarta yang memiliki banyak area permukiman, kawasan industri, serta Taman Mini Indonesia Indah.",
            ],
            [
                "name" => "Jakarta Selatan",
                "description" => "Wilayah Jakarta yang dikenal dengan pusat bisnis modern, kafe, dan kawasan permukiman elit.",
            ],
            [
                "name" => "Jakarta Utara",
                "description" => "Wilayah Jakarta yang mencakup kawasan pelabuhan, kawasan wisata Ancol, dan pusat perdagangan.",
            ],
        ];

        // Memasukkan data ke tabel locations
        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
