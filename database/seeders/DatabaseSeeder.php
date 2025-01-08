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
            CategorySeeder::class,
        ]);

        $admin = \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'password123'
        ]);
        $admin->assignRole('admin');

        $agent = \App\Models\User::factory()->create([
            'name' => 'Agent User',
            'email' => 'agent@example.com',
            'password' => 'password123',
            'wa_number' => '082243019049',
        ]);
        $agent->assignRole('agent');

        \App\Models\User::factory(10)->create()->each(function ($user) {
            $user->assignRole('customer');
        });
    }
}
