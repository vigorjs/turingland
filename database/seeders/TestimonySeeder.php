<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Data testimony yang ingin dimasukkan
        $testimonies = [
            [
                'client_name' => 'John Doe',
                 // Menggunakan path relatif
                'content' => 'This is an excellent service. I had a great experience!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'Jane Smith',
                'content' => 'The service was good, but I think there is room for improvement.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Mark Johnson',
                'content' => 'Not satisfied with the service. Had some issues with the product.',
                'rating' => 2,
                'is_active' => false,
            ],
            [
                'client_name' => 'Alice Williams',
                'content' => 'A wonderful experience overall. Highly recommended!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'David Brown',
                'content' => 'Fast and efficient service. Would use it again.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Linda Garcia',
                'content' => 'Great value for the price. The staff was friendly.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Michael Anderson',
                'content' => 'Decent service, but there were a few hiccups along the way.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'Sophia Martinez',
                'content' => 'Overall satisfied, but communication could be improved.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'James Taylor',
                'content' => 'Great experience, will definitely come back next time!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'Emma Thomas',
                'content' => 'Good experience, but I encountered some minor issues during the process.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'William Harris',
                'content' => 'The service was decent, but I expected more.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'Olivia Robinson',
                'content' => 'Amazing experience! I would recommend this service to everyone.',
                'rating' => 5,
                'is_active' => true,
            ],
        ];

        // Looping dan memasukkan data ke dalam database
        foreach ($testimonies as $testimony) {
            Testimony::create($testimony);
        }
    }
}
