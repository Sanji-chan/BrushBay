<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $tags = [
            ['name' => "Action"],
            ['name' => "Oil"],
            ['name' => "Modern"],
            ['name' => "Abstract"],
            ['name' => "Portrait"],
            ['name' => "Surrealism"],
            // ['name' => "tag 7"],
            // ['name' => "tag 8"]
        ];

        foreach ($tags as $tag) {
            Tag::factory()->create($tag);
        }
    }
}
