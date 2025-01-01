<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use function Laravel\Prompts\password;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'BILAL ZOUINE',
            "date_of_birth" => fake()->date(),
            "address" => fake()->address(),
            "phone" => substr(fake()->phoneNumber(), 10),
            'email' => 'bilalzouine9@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
        Teacher::factory()->create([
            'firstname' => 'teacher',
            'lastname' => 'teacher',
            "date_of_birth" => fake()->date(),
            "address" => fake()->address(),
            "phone" => substr(fake()->phoneNumber(), 10),
            'email' => 'teacher@teacher.teacher',
            'password' => Hash::make('123456789'),
            'remember_token' => Str::random(10),

        ]);
        Admin::factory()->create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            "date_of_birth" => fake()->date(),
            "address" => fake()->address(),
            "phone" => substr(fake()->phoneNumber(), 10),
            'email' => 'admin@admin.admin',
            'password' => Hash::make('123456789'),
            'remember_token' => Str::random(10),

        ]);
    }
}
