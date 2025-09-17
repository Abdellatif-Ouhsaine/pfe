<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
{
    $reviews = Review::with(['user:id,name,address'])
        ->select('id', 'user_id', 'restaurant_id', 'rating', 'comment', 'created_at')
        ->get();

    return response()->json($reviews);
}
   public function restoreviews($id)
{
    $reviews = Review::with('user')
        ->where('restaurant_id', $id)
        ->get();

    return response()->json($reviews);

}
public function store(Request $request)
{
    $validated = $request->validate([
        'restaurant_id' => 'required|exists:restaurants,id',
        'user_id' => 'required|exists:users,id',
        'rating' => 'required|integer|min:1|max:5',
        'comment' => 'required|string|max:500',
    ]);

    $review = Review::create([
        'restaurant_id' => $validated['restaurant_id'],
        'user_id' => $validated['user_id'],
        'rating' => $validated['rating'],
        'comment' => $validated['comment'],
    ]);

    return response()->json($review, 201);
}
}
