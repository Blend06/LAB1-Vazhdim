<?php
use App\Http\Controllers\Api\LigjerataController;
use App\Http\Controllers\Api\OrariController;
use App\Http\Controllers\Api\ProfesoriController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DrejtoriController;
use App\Http\Controllers\Api\LendaController;
use App\Http\Controllers\Api\NotaController;


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

    Route::get('/lenda/viti/{viti}', [LendaController::class, 'getLendaByViti']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/orari', OrariController::class);
    
    Route::get('/orari/viti/{viti}', [OrariController::class, 'getOrariByViti']);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/ligjerata', LigjerataController::class);
    
    Route::get('/ligjerata/lenda/{Lenda}', [LigjerataController::class, 'getLigjeratabyLenda']);

});

Route::middleware('auth:sanctum')->group(function(): void{
    Route::apiResource('/nota', NotaController::class );

    Route::get('/nota/user/{user_id}', [NotaController::class, 'getNotaByUser']);
    Route::get('/average/user/{user_id}', [NotaController::class, 'getAverageNotaByUser']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);