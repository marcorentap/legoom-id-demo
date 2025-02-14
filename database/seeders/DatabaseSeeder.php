<?php

namespace Database\Seeders;

use App\Models\Membership;
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
        User::factory(10)->create();
        User::factory()->create([
            'name' => 'Marc Owen Rentap',
            'email' => 'marcorentap@gmail.com',
            'role' => 'admin',
        ]);

        Membership::factory()->create([
            'name' => 'Standard',
        ]);
        Membership::factory()->create([
            'name' => 'Premium',
        ]);
    }
}
