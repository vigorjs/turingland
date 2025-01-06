<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'view listing']);
        Permission::create(['name' => 'create listing']);
        Permission::create(['name' => 'edit listing']);
        Permission::create(['name' => 'delete listing']);
        Permission::create(['name' => 'view reports']);

        // Create roles and assign permissions
        $customerRole = Role::create(['name' => 'customer']);
        $customerRole->givePermissionTo([
            'view listing',
        ]);

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'view listing',
            'create listing',
            'edit listing',
            'delete listing',
            'view reports',
        ]);
    }
}
