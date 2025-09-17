<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DeliveryController extends Controller
{
    public function index(Request $request) {
        return $request->user()->deliveries()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'restaurant_name' => 'required',
            'pickup_address' => 'required',
            'customer_name' => 'required',
            'delivery_address' => 'required',
            'contact_number' => 'required',
            'items' => 'required|array',
            'instructions' => 'nullable',
            'delivery_fee' => 'required|numeric',
            'driver_earning' => 'required|numeric'
        ]);

        $delivery = $request->user()->deliveries()->create($data);
        return response()->json($delivery, 201);
    }

    public function updateStatus(Request $request, Delivery $delivery) {
        $request->validate(['status' => 'required|in:picked_up,on_the_way,delivered']);
        
        $delivery->update([
            'status' => $request->status,
            'delivered_at' => $request->status === 'delivered' ? now() : null
        ]);
        
        return response()->json($delivery);
    }
}
