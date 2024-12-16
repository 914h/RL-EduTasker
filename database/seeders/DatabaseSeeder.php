<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(2)->create();
         \App\Models\User::factory()->create([
             'nom' => 'Houssam',
            'prenom' => 'Mr',
             'email' => 'houssam@abdennour.com',
             'password' => Hash::make('123456789'),
         ]);
         \App\Models\Admin::factory()->create([
            'nom' => 'Admin',
            'prenom' => 'Mr',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123456789'),
        ]);
        \App\Models\Teacher::factory()->create([
            'nom' => 'Ahmed',
            'prenom' => 'Teacher',
            'email' => 'teacher@teacher.com',
            'password' => Hash::make('123456789'),
            'birthdate' => '1990-01-01',
            'phone' => '0771734729',
        ]);
        $this->call(SemestreSeeder::class);
    }
}
