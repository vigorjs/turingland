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
                'client_avatar' => 'assets/apartemen.png', // Menggunakan path relatif
                'content' => 'This is an excellent service. I had a great experience!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'Jane Smith',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'The service was good, but I think there is room for improvement.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Mark Johnson',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Not satisfied with the service. Had some issues with the product.',
                'rating' => 2,
                'is_active' => false,
            ],
            [
                'client_name' => 'Alice Williams',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'A wonderful experience overall. Highly recommended!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'David Brown',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Fast and efficient service. Would use it again.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Linda Garcia',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Great value for the price. The staff was friendly.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'Michael Anderson',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Decent service, but there were a few hiccups along the way.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'Sophia Martinez',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Overall satisfied, but communication could be improved.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'James Taylor',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Great experience, will definitely come back next time!',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'client_name' => 'Emma Thomas',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'Good experience, but I encountered some minor issues during the process.',
                'rating' => 4,
                'is_active' => true,
            ],
            [
                'client_name' => 'William Harris',
                'client_avatar' => 'assets/apartemen.png',
                'content' => 'The service was decent, but I expected more.',
                'rating' => 3,
                'is_active' => true,
            ],
            [
                'client_name' => 'Olivia Robinson',
                'client_avatar' => 'assets/apartemen.png',
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
