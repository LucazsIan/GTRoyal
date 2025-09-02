<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{

    // Registro
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:225',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        // Criptografa a senha antes de salvar
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuário registrado com sucesso!',
            'user' => $user
        ], 201);
    }


    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'The provided credentials are incorrect.'
            ];
        }

        $user_token = new UserToken();
        $user_token->where('user_id', "=", $user->id)->delete();

        $user_token->user_id = $user->id;
        $data_hora = date(format: 'Y-m-d H:i:s');
        $user_token->token = md5($user->user_email . $user->user_id . $user->user_password . $data_hora);
        $user_token->valido_ate = Carbon::now()->addDays(7);
        $user_token->save();

        return response()->json([
            'user' => $user,
            'token' => $user_token->token,
        ], 200);
    }

    // Logout
    public function logout(Request $request)
    {
        $user_token = new UserToken();
        $user_token->where('user_id', "=", $request->user_id)->delete();

        return response()->json([
            'message' => 'Logout feito com sucesso.'
        ]);
    }
}