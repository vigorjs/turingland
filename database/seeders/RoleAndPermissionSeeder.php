<?php

namespace Database\Seeders;

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
        Permission::create(['name' => 'view property']);
        Permission::create(['name' => 'create property']);
        Permission::create(['name' => 'edit property']);
        Permission::create(['name' => 'delete property']);

        Permission::create(['name' => 'view banner']);
        Permission::create(['name' => 'create banner']);
        Permission::create(['name' => 'edit banner']);
        Permission::create(['name' => 'delete banner']);

        Permission::create(['name' => 'view reports']);

        Permission::create(['name' => 'view user']);
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);

        Permission::create(['name' => 'webmanagement']);

        // Create roles and assign permissions
        $customerRole = Role::create(['name' => 'customer']);
        $customerRole->givePermissionTo([
            'view property',
            'view banner',
        ]);

        $adminRole = Role::create(['name' => 'agent']);
        $adminRole->givePermissionTo([
            'view property',
            'create property',
            'edit property',
            'delete property',
            'view reports',
            'view banner',
        ]);

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'view property',
            'create property',
            'edit property',
            'delete property',
            'view banner',
            'create banner',
            'edit banner',
            'delete banner',
            'view reports',
            'view user',
            'create user',
            'edit user',
            'delete user',
            'webmanagement',
        ]);
    }
}
