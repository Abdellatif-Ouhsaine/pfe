<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Support\Carbon;

class cafesController extends Controller
{
    
    public function index() {
        
        $Cafes = Restaurant::where('status', 'approved')
        ->where('business_type', 'cafe')
        ->get();
        return response()->json($Cafes) ;
    }
    public function cofebrande() {
        $Cafes = Restaurant::where('status', 'approved')
            ->where('business_type', 'cafe')
            ->whereIn('id', [11, 12, 13, 14])
            ->get();
    
        return response()->json($Cafes);
    }



    
    public function popular_cafe() {
        $top10Cafes = Restaurant::where('business_type', 'cafe')
         ->orderBy('rating', 'desc')
         ->take(10)
        ->get();

        return response()->json($top10Cafes) ;
    }


}
