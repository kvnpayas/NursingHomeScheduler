<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        User::create( [
            'name' => 'Admin User',
            'email' => 'kvnpayas@gmail.com',
            'password'=> Hash::make('password12'),
            'role'=> 'admin',
            'status' => 'active',
            'phone' => '09350544888',
        ]);
    }
}
