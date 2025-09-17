<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProfileController extends Controller
{
    public function show(Request $request) {
        return $request->user();
    }

    public function update(Request $request) {
        $driver = $request->user();
        
        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:drivers,email,'.$driver->id,
            'phone' => 'sometimes|string',
            'delivery_zone' => 'sometimes|string',
            'status' => 'sometimes|in:online,offline,break'
        ]);

        $driver->update($data);
        return response()->json($driver);
    }
}