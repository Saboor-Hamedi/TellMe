<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding 10 posts...\n";
        Post::factory()->count(10)->create();
        echo "Done!\n";
    }
}
