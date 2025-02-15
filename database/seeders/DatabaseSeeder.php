<?php

namespace Database\Seeders;

use App\Models\Membership;
use App\Models\Platform;
use App\Models\PlatformSettings;
use App\Models\User;
use App\Models\UserMembership;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(100)->create();
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

        $users = DB::table('users')->pluck('id');
        $memberships = DB::table('memberships')->pluck('id');

        foreach ($users as $user_id) {
            $userMembership = new UserMembership;
            $userMembership->user_id = $user_id;
            $userMembership->membership_id = fake()->randomElement($memberships);
            $userMembership->save();
        }

        PlatformSettings::create([
            'key' => 'name',
            'value' => 'My Organization'
        ]);
        PlatformSettings::create([
            'key' => 'logo',
            'value' => 'public/logo.svg'
        ]);
    }
}
