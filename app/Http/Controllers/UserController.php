<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render("admin/user-management/index", compact("users"));
    }
    public function create()
    {
        return Inertia::render("admin/user-management/create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15',
            'role' => 'required|string|in:admin,staff,customer',
        ]);

        // generate a secure random password
        $defaultPassword = Str::random(10);

        // create user with default password
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($defaultPassword),
            'default_password' => $defaultPassword,
            'phone' => $validated['phone'],
            'role' => $validated['role'],
            'status' => 'active',
        ]);

        return redirect()->route('admin.user-management')->with('success', 'User created successfully.');

    }
}
