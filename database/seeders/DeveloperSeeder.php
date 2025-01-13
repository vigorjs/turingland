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
                "name" => "Saydova"
            ],
            [
                "name" => "Virgro"
            ],
            [
                "name" => "Atta"
            ],
            [
                "name" => "Alan"
            ],
        ];

        foreach($developers as $developer){
            Developer::create($developer);
        }
    }
}
