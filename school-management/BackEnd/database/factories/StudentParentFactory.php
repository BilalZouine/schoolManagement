<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentParent>
 */
class StudentParentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
                'firstname' => fake()->firstName(),
                'lastname' => fake()->lastName(),
                'email' => fake()->email(),
                'password' => Hash::make('123456789'),
                'date_of_birth' => fake()->date(),
                'gendre' => 'M',
                'last_login_date' => now(),
                'blood_type' => "A+",
                'address' => fake()->address(),
                'phone' => substr(fake()->phoneNumber(), 10),
            
        ];
    }
}
