<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
   public function weeklyStats()
{
    $start = Carbon::now()->startOfMonth();
    $end = Carbon::now()->endOfMonth();

    // On récupère toutes les commandes du mois
    $orders = DB::table('orders')
        ->select('created_at', 'total')
        ->whereBetween('created_at', [$start, $end])
        ->get();

    // On récupère toutes les réservations du mois
    $reservations = DB::table('reservations')
        ->select('created_at')
        ->whereBetween('created_at', [$start, $end])
        ->get();

    // Créer une structure semaine => [commandes, reservations]
    $stats = [];

    foreach ($orders as $order) {
        $week = intval(Carbon::parse($order->created_at)->diffInWeeks($start)) + 1;
        $stats[$week]['commandes'] = ($stats[$week]['commandes'] ?? 0) + $order->total;
    }

    foreach ($reservations as $res) {
        $week = intval(Carbon::parse($res->created_at)->diffInWeeks($start)) + 1;
        $stats[$week]['reservations'] = ($stats[$week]['reservations'] ?? 0) + 1;
    }

    // Transformer en tableau lisible pour le frontend
    $final = [];
    foreach ($stats as $week => $values) {
        $final[] = [
            'semaine' => 'Semaine ' . $week,
            'commandes' => $values['commandes'] ?? 0,
            'reservations' => $values['reservations'] ?? 0,
        ];
    }

    return $final;
}
}
