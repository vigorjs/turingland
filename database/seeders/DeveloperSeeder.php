<?php

namespace Database\Seeders;

use App\Models\Developer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeveloperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $developers = [
            [
                "name" => "Saydova",
                "description" => "Developer CryptoHouse"
            ],
            [
                "name" => "Virgro",
                "description" => "Semaranggggggg"
            ],
            [
                "name" => "Atta",
                "description" => "Developer Pembangunan Gemilang"
            ],
            [
                "name" => "Alan",
                "description" => "Developer Rumah Barbie Indah Kapuk"
            ],
        ];

        foreach($developers as $developer){
            Developer::create($developer);
        }
    }
}
