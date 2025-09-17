<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "hello" ;
});

Route::get('/rest',[RestaurantController::class,'cuisine']) ;