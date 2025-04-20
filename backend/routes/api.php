<?php

use App\Http\Controllers\DeveloppeurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/listedeveloppeur',[DeveloppeurController::class,'AfficheList_DevApi']);;


Route::post('/developpeurs', [DeveloppeurController::class, 'storeapi']); 
Route::post('/developpeurs/{id}', [DeveloppeurController::class, 'updateapi']); 
Route::delete('/developpeurs/{id}', [DeveloppeurController::class, 'destroyapi']);
Route::put('/developpeurs/{id}', [DeveloppeurController::class, 'updateapi']);  