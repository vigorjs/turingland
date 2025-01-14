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
                'image_path' => 'assets/summer_sale.jpg',
                'link' => 'https://example.com/summer-sale',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'New Arrivals',
                'description' => 'Check out the latest collection of our products.',
                'image_path' => 'assets/new_arrivals.jpg',
                'link' => 'https://example.com/new-arrivals',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Winter Collection',
                'description' => 'Get ready for winter with our new collection.',
                'image_path' => 'assets/winter_collection.jpg',
                'link' => 'https://example.com/winter-collection',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Clearance Sale',
                'description' => 'Massive clearance sale – up to 70% off!',
                'image_path' => 'assets/clearance_sale.jpg',
                'link' => 'https://example.com/clearance-sale',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Black Friday Deals',
                'description' => 'Unbelievable Black Friday discounts! Shop now.',
                'image_path' => 'assets/black_friday_deals.jpg',
                'link' => 'https://example.com/black-friday',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Holiday Specials',
                'description' => 'Holiday specials – shop and save big!',
                'image_path' => 'assets/holiday_specials.jpg',
                'link' => 'https://example.com/holiday-specials',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Flash Sale',
                'description' => 'Limited-time flash sale – hurry before it’s over!',
                'image_path' => 'assets/flash_sale.jpg',
                'link' => 'https://example.com/flash-sale',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Best of 2024',
                'description' => 'The best products of 2024 – shop our favorites.',
                'image_path' => 'assets/best_of_2024.jpg',
                'link' => 'https://example.com/best-of-2024',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Exclusive Offers',
                'description' => 'Exclusive offers just for you. Don’t miss out!',
                'image_path' => 'assets/exclusive_offers.jpg',
                'link' => 'https://example.com/exclusive-offers',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Weekend Deals',
                'description' => 'Weekend deals on selected items.',
                'image_path' => 'assets/weekend_deals.jpg',
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
