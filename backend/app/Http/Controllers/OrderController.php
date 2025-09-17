<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function store_order(Request $request)
{
    Log::info('Requête reçue pour création de commande', $request->all());

    $validator = Validator::make($request->all(), [
        'user_id' => 'required|exists:users,id',
        'rider_id' => 'nullable|exists:users,id',
        'restaurant_id' => 'required|exists:restaurants,id',
        'order_number' => 'required|unique:orders,order_number',
        'status' => 'required|in:pending,processing,out_for_delivery,delivered,cancelled',
        'delivery_address' => 'required|string',
        'contact_number' => 'required|string',
        'special_instructions' => 'nullable|string',
        'subtotal' => 'required|numeric|min:0',
        'delivery_fee' => 'required|numeric|min:0',
        'total' => 'required|numeric|min:0',
        'payment_method' => 'required|in:cash,credit_card,mobile_payment',
        'payment_status' => 'required|in:pending,paid,failed',
        'delivered_at' => 'nullable|date',
        
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    

    $order = Order::create($validator->validated());
    return response()->json($order, 201);
}
public function store_items(Request $request)
{
    Log::info('Requête reçue pour création de commande itms ', $request->all());

    $data = $request->all(); // doit être un array associatif

    $validator = Validator::make($data, [
        'order_id' => 'required|exists:orders,id',
        'menu_id' => 'required|exists:menus,id',
        'quantity' => 'required|integer|min:1',
        'price' => 'required|numeric|min:0',
        'special_instructions' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $item = OrderItem::create($validator->validated());

    return response()->json($item, 201);
}
public function getUserOrders($userId)
{
    $orders = Order::with(['items.menu'])
        ->where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($order) {
            return [
                'id' => $order->id,
                'date' => $order->created_at->format('Y-m-d H:i'),
                'status' => ucfirst($order->status),
                'items' => $order->items->map(fn($item) => $item->menu->name)->implode(', ')
            ];
        });

    return response()->json($orders);
}

// Annuler une commande
public function cancelOrder($id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    if ($order->status !== 'pending') {
        return response()->json(['message' => 'Only pending orders can be cancelled'], 400);
    }

    $order->status = 'cancelled';
    $order->save();

    return response()->json(['message' => 'Order cancelled successfully', 'order' => $order]);
}
}
