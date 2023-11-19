<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/users/logout', [AuthController::class, 'logout']);
  Route::get('/users/me', [AuthController::class, 'me']);
  Route::apiResource('survey', SurveyController::class);

  Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::post('/users/signup', [AuthController::class, 'signup']);
Route::post('/users/login', [AuthController::class, 'login']);

Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
Route::get('/survey/get-by-title/{survey:title}', [SurveyController::class, 'getBySlug']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);