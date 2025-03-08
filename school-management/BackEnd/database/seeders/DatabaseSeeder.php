<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'bilal zouine',
            'email' => 'bilalzouine9@gmail.com',
            'password' => Hash::make('123456789')
        ]);

        Admin::create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'email' => 'admin@admin.admin',
            'password' => Hash::make('123456789'),
            'date_of_birth' => fake()->date(),
            'gendre' => 'm',
            'blood_type' => "O+",
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'remember_token' => Str::random(10)
        ]);

        Teacher::create([
            'firstname' => 'teacher 1',
            'lastname' => 'teacher 1',
            'email' => 'teacher@teacher.teacher',
            'password' => Hash::make('123456789'),
            'date_of_birth' => fake()->date(),
            'gendre' => 'm',
            'blood_type' => "A+",
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'remember_token' => Str::random(10)


        ]);
       
    }
}
