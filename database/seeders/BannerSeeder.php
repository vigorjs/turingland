<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Data banner yang ingin dimasukkan
        $banners = [
            [
                'title' => 'Summer Sale',
                'description' => 'Big discounts on summer items!',
                'link' => 'https://example.com/new-arrivals',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'New Arrivals',
                'description' => 'Check out the latest collection of our products.',
                'link' => 'https://example.com/new-arrivals',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Winter Collection',
                'description' => 'Get ready for winter with our new collection.',
                'link' => 'https://example.com/winter-collection',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Clearance Sale',
                'description' => 'Massive clearance sale – up to 70% off!',
                'link' => 'https://example.com/clearance-sale',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Black Friday Deals',
                'description' => 'Unbelievable Black Friday discounts! Shop now.',
                'link' => 'https://example.com/black-friday',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Holiday Specials',
                'description' => 'Holiday specials – shop and save big!',
                'link' => 'https://example.com/holiday-specials',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Flash Sale',
                'description' => 'Limited-time flash sale – hurry before it’s over!',
                'link' => 'https://example.com/flash-sale',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Best of 2024',
                'description' => 'The best products of 2024 – shop our favorites.',
                'link' => 'https://example.com/best-of-2024',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Exclusive Offers',
                'description' => 'Exclusive offers just for you. Don’t miss out!',
                'link' => 'https://example.com/exclusive-offers',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Weekend Deals',
                'description' => 'Weekend deals on selected items.',
                'link' => 'https://example.com/weekend-deals',
                'order' => 10,
                'is_active' => true,
            ],
        ];

        // Looping dan memasukkan data ke dalam database
        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
