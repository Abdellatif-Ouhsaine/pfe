<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
            'type' => ['required', Rule::in(['client', 'rider', 'admin', 'partner'])], 
        ]);

        
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'type' => $validated['type'],
        ]);

        // Return created user data (or whatever you want)
        return response()->json($user, 201);
    }
    public function update(Request $request, $id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
        ]);
    
        $user->name = $request->name;
        $user->address = $request->address;
        $user->save();
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }
}
