<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarroController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Api_Auth;


// Middleware
Route::middleware(Api_Auth::class)->group(function () {

    Route::apiResource('posts', PostController::class);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/salva_carro', [CarroController::class, 'salvar_carro']);

    Route::put('/edita_carro/{id}', [CarroController::class, 'editar_carro']);

    Route::delete('/deleta_carro/{id}', [CarroController::class, 'deletar_carro']);
});

// Autenticação
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

//Retorna carros
Route::get('/retorna_carros', [CarroController::class, 'retornar_carros']);

// Post
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
