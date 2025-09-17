<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\SeatingArea;
use Illuminate\Http\Request;



class SeatingAreaController extends Controller
{
    public function index($restaurant_id)
    {
        $areas = SeatingArea::with('seatingPositions')
            ->where('restaurant_id', $restaurant_id)
            ->get();
    
        // Group by area name and merge tables
        $grouped = $areas->groupBy('name')->map(function ($group) {
            $first = $group->first();
    
            // Merge tables from all duplicated areas
            $allTables = $group->flatMap->seatingPositions;
    
            return [
                'id' => $first->id,
                'name' => $first->name,
                'restaurant_id' => $first->restaurant_id,
                'image_url' => $first->image_url,
                'created_at' => $first->created_at,
                'updated_at' => $first->updated_at,
                'tables' => $allTables->values()
            ];
        })->values();
    
        return response()->json($grouped);
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
    ]);

    $validated['status'] = 'confirmed';

    $reservation = Reservation::create($validated);

    return response()->json($reservation, 201);
}

    
}
