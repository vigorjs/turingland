<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
