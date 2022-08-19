<?php

use App\Http\Controllers\Api\CategoryController as ApiCategoryController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    Route::apiResource('reservation', ReservationController::class);
});
Route::apiResource('categories', ApiCategoryController::class);
Route::apiResource('menu', MenuController::class);
Route::apiResource('table', TableController::class);
Route::apiResource('status', StatusController::class);



