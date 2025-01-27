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
            'name' => 'Sigma Boy',
            'email' => 'admin@example.com',
            'password' => 'password123'
        ]);
        $admin->assignRole('admin');
        $admin = \App\Models\User::factory()->create([
            'name' => 'Agent User',
            'email' => 'agent@example.com',
            'password' => 'password123',
            'is_agent_active' => true
        ]);
        $admin->assignRole('agent');

        \App\Models\User::factory(5)->create([
            'is_agent_active' => true,
        ])->each(function ($agent) {
            $agent->assignRole('agent');
        });
        \App\Models\User::factory(5)->create()->each(function ($user) {
            $user->assignRole('agent');
        });

        \App\Models\User::factory(10)->create()->each(function ($user) {
            $user->assignRole('customer');
        });

    }
}
