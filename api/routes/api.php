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
    Route::post('/salva', [CarroController::class, 'salvar']);
});

//Retorna carros
Route::get('/retorna_carros', [CarroController::class,'retorna_carros']);

// Autenticação
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

//Editar
Route::put('/edita/{id}', [CarroController::class, 'atualizar_carro']);

//Deletar
Route::delete('/deleta/{id}', [CarroController::class, 'deletar_carro']);

// Post
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




