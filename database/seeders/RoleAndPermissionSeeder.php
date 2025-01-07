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
        Permission::create(['name' => 'view ads']);
        Permission::create(['name' => 'create ads']);
        Permission::create(['name' => 'edit ads']);
        Permission::create(['name' => 'delete ads']);
        Permission::create(['name' => 'view reports']);
        Permission::create(['name' => 'view user']);
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);

        // Create roles and assign permissions
        $customerRole = Role::create(['name' => 'customer']);
        $customerRole->givePermissionTo([
            'view ads',
        ]);

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'view ads',
            'create ads',
            'edit ads',
            'delete ads',
            'view reports',
        ]);

        $adminRole = Role::create(['name' => 'super_admin']);
        $adminRole->givePermissionTo([
            'view ads',
            'create ads',
            'edit ads',
            'delete ads',
            'view reports',
            'view user',
            'create user',
            'edit user',
            'delete user',
        ]);
    }
}
