<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/verificar-email/{id}', [AuthController::class, 'showVerificationForm'])
    ->name('verificacodigo');
   
Route::post('/verifica-email/{id}', [AuthController::class, 'verifica_email'])
    ->name('verifica.email');


