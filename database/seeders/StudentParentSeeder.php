<?php

namespace Database\Seeders;

use App\Models\StudentParent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class StudentParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Create 10 student parents
        foreach (range(1, 10) as $index) {
            StudentParent::create([
                'prenom' => $faker->firstName,
                'nom' => $faker->lastName,
                'birthdate' => $faker->dateTimeThisCentury->format('Y-m-d H:i:s'),
                'gender' => $faker->randomElement(['m', 'f']),
                'address' => $faker->address,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->unique()->numerify('##########'),
                'password' => bcrypt($faker->password), 
            ]);
    }
}
}
