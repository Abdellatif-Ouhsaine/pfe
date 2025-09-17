<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\RiderStatus;

class RidersController extends Controller
{
    // 🔁 GET: Récupérer le statut actuel du livreur
    public function getStatus(Request $request)
{
    $riderId = $request->query('rider_id');

    // Vérifier que c’est bien un utilisateur de type rider
    $user = User::where('id', $riderId)->where('type', 'rider')->first();
    if (!$user) {
        return response()->json(['message' => 'Livreur introuvable.'], 404);
    }

    // Rechercher le statut du rider par son user_id
    $riderStatus = RiderStatus::where('user_id', $riderId)->first();
    if (!$riderStatus) {
        return response()->json(['message' => 'Statut introuvable.'], 404);
    }

    return response()->json(['status' => $riderStatus->status]);
}


   public function updateStatus(Request $request)
{
    $request->validate([
        'status' => 'required|in:available,on_delivery,on_break,offline',
        'rider_id' => 'required|exists:users,id',
    ]);

    // Vérifier que c’est bien un livreur
    $user = User::where('id', $request->input('rider_id'))
                ->where('type', 'rider')
                ->first();

    if (!$user) {
        return response()->json(['message' => 'Ce n\'est pas un livreur valide.'], 400);
    }

    // Mettre à jour le statut dans la table rider_statuses
    $riderStatus = RiderStatus::where('user_id', $request->input('rider_id'))->first();

    if (!$riderStatus) {
        return response()->json(['message' => 'Statut introuvable.'], 404);
    }

    $riderStatus->status = $request->input('status');
    $riderStatus->save();

    return response()->json([
        'message' => 'Statut mis à jour avec succès.',
        'status' => $riderStatus->status,
    ]);
}

    public function getTodaySummary($riderId)
{


    $orders = Order::where('rider_id', $riderId)
        ->where('status', 'delivered')
        ->get(['id', 'delivered_at']);

    $earnings = $orders->count() * 3.5;

    return response()->json([
        'earnings' => $earnings,
        'orders' => $orders,
    ]);
}

private function formatDecimalHours($decimalHours)
    {
        $hours = floor($decimalHours);
        $minutes = round(($decimalHours - $hours) * 60);
        return "{$hours}h {$minutes}min";
    }

public function reverseGeocode($lat, $lng)
{
    $url = "https://nominatim.openstreetmap.org/reverse?lat={$lat}&lon={$lng}&format=json";

    $response = Http::withHeaders([
        'User-Agent' => 'YourAppNameHere' // obligatoire pour Nominatim
    ])->get($url);

    if ($response->successful()) {
        $data = $response->json();
        $parts = explode(',', $data['display_name']);
        return trim($parts[1] ?? $data['display_name']); // ✅ retourne la zone
    }

    return 'Zone inconnue'; // ❌ uniquement si l'appel échoue
}



public function getProfile($riderId)
{
    // 🔍 Vérifier que l'utilisateur est bien un livreur
    $user = User::where('id', $riderId)->where('type', 'rider')->first();
    if (!$user) {
        return response()->json(['message' => 'Livreur introuvable.'], 404);
    }

    // 🔁 Récupérer le statut actuel
    $status = RiderStatus::where('user_id', $riderId)->first();
    $statusValue = $status ? $status->status : 'offline';

    // 🔢 Compter les livraisons
    $totalDeliveries = Order::where('rider_id', $riderId)
        ->where('status', 'delivered')
        ->count();

    // ⭐ Exemple statique d'évaluation et d'heures (à remplacer plus tard)
    $rating = 4.6;
    $totalHours = 258;

    // 📅 Récupérer les commandes du jour
    $today = Carbon::today();
    $ordersToday = Order::where('rider_id', $riderId)
        ->where('status', 'delivered')
        ->get();

    $todayDeliveries = $ordersToday->count();
    // Estimation rapide
    $averageDeliveryTime = 20; // minutes
    $todayHours = ($todayDeliveries * $averageDeliveryTime) / 60;
    $formattedTodayHours = $this->formatDecimalHours($todayHours);

    $todayEarnings = $todayDeliveries * 3.5;

    $deliveryZone = 'Non définie';
 if ($status && $status->current_lat && $status->current_lng) {
    $deliveryZone = $this->reverseGeocode($status->current_lat, $status->current_lng);
 }


    return response()->json([
        'name' => $user->name,
        'phone' => $user->phone,
        'email' => $user->email,
        'delivery_zone' => $deliveryZone,
        'status' => $statusValue,
        'total_deliveries' => $totalDeliveries,
        'rating' => $rating,
        'total_hours' => $totalHours,

        'today_deliveries' => $todayDeliveries,
        'today_hours' => $formattedTodayHours,
        'today_earnings' => $todayEarnings,
    ]);
}


public function showInfo($userId)
{
    $user = User::find($userId);
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    $status = RiderStatus::where('user_id', $userId)->first();
    if (!$status) {
        return response()->json(['message' => 'Statut du livreur non trouvé'], 404);
    }

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'phone' => $user->phone,
        'address' => $user->address,
        'current_lat' => $status->current_lat,
        'current_lng' => $status->current_lng,
    ]);
}
public function updateInfo(Request $request, $userId)
{
    $user = User::find($userId);
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    $status = RiderStatus::where('user_id', $userId)->first();
    if (!$status) {
        return response()->json(['message' => 'Statut du livreur non trouvé'], 404);
    }

    $validated = $request->validate([
        'name' => 'nullable|string|max:255',
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
        'current_lat' => 'nullable|numeric',
        'current_lng' => 'nullable|numeric',
    ]);

    // Mise à jour des données utilisateur
    $user->update([
        'name' => $validated['name'] ?? $user->name,
        'phone' => $validated['phone'] ?? $user->phone,
        'address' => $validated['address'] ?? $user->address,
    ]);

    // Mise à jour des coordonnées de géolocalisation
    $status->update([
        'current_lat' => $validated['current_lat'] ?? $status->current_lat,
        'current_lng' => $validated['current_lng'] ?? $status->current_lng,
    ]);

    return response()->json(['message' => 'Informations mises à jour avec succès']);
}



}

