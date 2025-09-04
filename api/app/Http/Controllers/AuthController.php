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
            'nome' => 'required|max:225',
            'sobrenome' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'telefone' => 'required|string|unique:users',
            'data_nasc' => 'required|date',
            'pais' => 'required|string|max:50',
            'cep' => 'required|string|max:9',
            'password' => 'required|confirmed'
        ]);

        // Criptografa a senha antes de salvar
        $user = User::create([
            'nome' => $fields['nome'],
            'sobrenome' => $fields['sobrenome'],
            'email' => $fields['email'],
            'telefone' => $fields['telefone'],
            'data_nasc' => $fields['data_nasc'],
            'pais' => $fields['pais'],
            'cep' => $fields['cep'],
            'password' => $fields['password'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuário registrado com sucesso!',
            'user' => [
                'id' => $user->id,
                'nome' => $user->nome,
                'sobrenome' => $user->sobrenome,
                'email' => $user->email,
                'telefone' => $user->telefone,
                'data_nasc' => $user->data_nasc,
                'pais' => $user->pais,
                'cep' => $user->cep,
            ]
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
        $data_hora = date('Y-m-d H:i:s');
        $user_token->token = md5($user->email . $user->id . $user->password . $data_hora);
        $user_token->valido_ate = Carbon::now()->addDays(7);
        $user_token->save();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'nome' => $user->nome,
                'sobrenome' => $user->sobrenome,
                'email' => $user->email,
                'telefone' => $user->telefone,
                'data_nasc' => $user->data_nasc,
                'pais' => $user->pais,
                'cep' => $user->cep,
            ],
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
