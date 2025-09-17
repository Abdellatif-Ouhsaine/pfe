<?php

namespace App\Http\Controllers;

use App\Models\Reservation;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function getUserReservations($user_id)
    {
        $reservations = DB::table('reservations')
        ->join('restaurants', 'reservations.restaurant_id', '=', 'restaurants.id')
        ->join('seating_positions', 'reservations.seating_position_id', '=', 'seating_positions.id')
        ->join('seating_areas', 'seating_positions.seating_area_id', '=', 'seating_areas.id')
        ->where('reservations.user_id', $user_id)
        ->select(
            'reservations.id as reservation_id', // 
            'restaurants.name as restaurant_name',
            'seating_areas.name as seating_area_name',
            'reservations.reservation_date',
            'reservations.reservation_time',
            'reservations.status' // ✅ Ajout du statut ici
        )
        ->orderBy('reservations.reservation_date', 'desc')
        ->get();

    return response()->json([
        'status' => 'success',
        'data' => $reservations
    ]);
}

public function cancelReservation($id)
{
    $reservation = Reservation::find($id);

    if (!$reservation) {
        return response()->json([
            'status' => 'error',
            'message' => 'Reservation not found'
        ], 404);
    }

    $reservation->status = 'cancelled';
    $reservation->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Reservation cancelled successfully',
        'data' => $reservation
    ]);
}
}
