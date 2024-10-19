<?php
use App\Http\Controllers\Api\ProfesoriController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DrejtoriController;
use App\Http\Controllers\Api\LendaController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/students', StudentController::class)->parameters([
        'students' => 'user',
    ]);
    Route::apiResource('/drejtori', DrejtoriController::class)->parameters([
        'drejtori' => 'user',
    ]);;
    Route::apiResource('/profesori', ProfesoriController::class)->parameters([
        'profesori' => 'user',
    ]);;
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/lenda', LendaController::class);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);