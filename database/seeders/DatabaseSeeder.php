<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            LocationSeeder::class,
            AreaSeeder::class,
            DeveloperSeeder::class,
            PropertySeeder::class,
            TestimonySeeder::class,
            BannerSeeder::class,
            WebPreferencesSeeder::class,
        ]);
    }
}
