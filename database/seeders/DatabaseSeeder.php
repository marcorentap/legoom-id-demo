<?php

namespace Database\Seeders;

use App\Models\Membership;
use App\Models\Platform;
use App\Models\PlatformSettings;
use App\Models\Profile;
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
        User::factory()->create([
            'name' => 'Example User',
            'email' => 'exampleuser@gmail.com',
            'role' => 'user',
        ]);

        Membership::factory()->create([
            'name' => 'Standard',
        ]);
        Membership::factory()->create([
            'name' => 'Premium',
        ]);

        $memberships = DB::table('memberships')->pluck('id');
        foreach (User::all() as $user) {
            $userMembership = new UserMembership;
            $userMembership->user_id = $user->id;
            $userMembership->membership_id = fake()->randomElement($memberships);
            $userMembership->save();

            $profile = new Profile;
            $profile->user_id = $user->id;
            $profile->display_name = $user->name;
            $profile->save();
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
