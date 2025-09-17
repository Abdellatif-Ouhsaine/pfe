<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $driver = $request->user();
        $today = now()->format('Y-m-d');
        
        return response()->json([
            'status' => $driver->status,
            'earnings_today' => $driver->deliveries()
                ->whereDate('created_at', $today)
                ->sum('driver_earning'),
            'completed_today' => $driver->deliveries()
                ->whereDate('created_at', $today)
                ->where('status', 'delivered')
                ->count(),
            'current_delivery' => $driver->deliveries()
                ->where('status', '!=', 'delivered')
                ->latest()
                ->first()
        ]);
    }
}