<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Support\Carbon;

class RestaurantController extends Controller
{
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'cuisine_type' => 'nullable|string|max:255',
            'business_type' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'description' => 'nullable|string',
            'agree_to_terms' => 'required|boolean',
            'status' => 'required|string|in:pending,approved,rejected',
            'business_license' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
    
        // Handle business license file
        if ($request->hasFile('business_license')) {
            $validated['business_license'] = $request->file('business_license')->store('licenses', 'public');
        }
    
        // Handle logo
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('logos', 'public');
        }
    
        $restaurant = Restaurant::create($validated);
    
        return response()->json($restaurant, 201);
    }
    
    public function index() {
        
        $Restaurant = Restaurant::where('status', 'approved')
        ->where('business_type', 'restaurant')
        ->get();
        return response()->json($Restaurant) ;
    }

    public function popular_resto() {
        $Restaurant = Restaurant::where('status', 'approved')
                    ->where('business_type', 'restaurant')
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->get();
        
        return response()->json($Restaurant) ;
        } 

    public function HotRestaurants() {
        $hotRestaurants = Restaurant::whereHas('orders', function ($query) {
            $query->whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ]);
        })
        ->withCount(['orders as orders_this_week_count' => function ($query) {
            $query->whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ]);
        }])
        ->having('orders_this_week_count', '>', 9)
        ->get();

        return response()->json($hotRestaurants);
    }

    public function simularresto($id)
    {
        
        $restaurant = Restaurant::findOrFail($id);
    
        
        $similar = Restaurant::where('cuisine_type', $restaurant->cuisine_type)
                    ->where('id', '!=', $restaurant->id)
                    ->take(6) //
                    ->get();
    
        return response()->json($similar);
    } 


    //resto user 
    public function getRestaurantByUser($id)
    {
        $restaurant = Restaurant::where('user_id', $id)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Aucun restaurant trouvé pour cet utilisateur.'], 404);
        }

        return response()->json([
            'restaurant_id' => $restaurant->id,
            'name' => $restaurant->name,
            'business_type' => $restaurant->business_type,
            'status' => $restaurant->status
        ]);
    }

}
