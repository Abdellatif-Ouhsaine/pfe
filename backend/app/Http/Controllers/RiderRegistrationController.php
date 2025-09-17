<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RiderStatus;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class RiderRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:6',
            'phone' => 'required|string|max:20',

            'vehicleType' => 'required|string|max:255',
            'vehicleModel' => 'required|string|max:255',
            'licensePlate' => 'required|string|max:255',

            'idDocument' => 'required|file|mimes:jpg,jpeg,png,pdf',
            'drivingLicense' => 'required|file|mimes:jpg,jpeg,png,pdf',
        ]);

        // Create User
        $user = User::create([
            'name' => $validated['fullName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'type' => 'rider',
        ]);

        // Store Files
        $idPath = $request->file('idDocument')->store('documents/id','public');
        $licensePath = $request->file('drivingLicense')->store('documents/license','public');

        // Create Rider
        Rider::create([
            'user_id' => $user->id,
            'vehicle_type' => $validated['vehicleType'],
            'vehicle_model' => $validated['vehicleModel'],
            'license_plate' => $validated['licensePlate'],
            'id_document_path' => $idPath,
            'driving_license_path' => $licensePath,
            'status' => 'pending',
        ]);

        RiderStatus::create([
            'user_id' => $user->id,
            'status' => 'available',       
            'current_lat' => null,
            'current_lng' => null,
        ]);

        return response()->json(['message' => 'Rider registered successfully.'], 201);
    }
}
