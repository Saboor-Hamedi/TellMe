<?php

namespace Database\Seeders;

use App\Models\Post;
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

        User::create([
            'name' => 'Admin',
            'email' => 'saboor@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123'), 
            'remember_token' => null,
        ]);
        User::factory()->count(1)->create();
        Post::factory()->count(10)->create();
    }
}
