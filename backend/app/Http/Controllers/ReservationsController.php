<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    public function index(Request $request)
    {
        $restaurantId = $request->query('restaurant_id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'restaurant_id parameter is required'], 400);
        }
    
        $reservations = Reservation::with([
                'seatingPosition.seatingArea',
                'user', // Si vous avez besoin des infos utilisateur
                'restaurant' // Si vous avez besoin des infos restaurant
            ])
            ->where('restaurant_id', $restaurantId)
            ->get();
    
        return response()->json($reservations);
    }

    public function getByRestaurant($restaurant_id)
    {
        $reservations = Reservation::with(['user', 'seatingPosition.seatingArea'])
            ->where('restaurant_id', $restaurant_id)
            ->get();
    
        return response()->json($reservations);
    }
    


    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'restaurant_id' => 'required|exists:restaurants,id',
            'seating_position_id' => 'nullable|exists:seating_positions,id',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required',
            'number_of_guests' => 'required|integer|min:1',
            'seating_preference' => 'nullable|string',
            'special_requests' => 'nullable|string',
            'status' => 'required|in:confirmed,pending,cancelled,completed',
        ]);

        $reservation = Reservation::create($validated);

        return response()->json($reservation, 201);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:confirmed,pending,cancelled,completed',
        ]);

        $reservation->update($validated);

        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted']);
    }
}

