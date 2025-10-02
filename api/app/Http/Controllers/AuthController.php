<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Mail\VerificaMail;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;

class AuthController extends Controller
{

    // Registro
    public function register(Request $request)
    {;

        // Criptografa a senha antes de salvar
        $user = User::create([
            'nome' => $request->nome,
            'sobrenome' => $request->sobrenome,
            'email' => $request->email,
            'telefone' => $request->telefone,
            'data_nasc' => $request->data_nasc,
            'pais' => $request->pais,
            'cep' => $request->cep,
            'password' => $request->password,
            'validado' => 'N',
            'codigo' => str(rand(1000, max: 9999))
        ]);

        //Mail::to($user->email)->send(new VerificaMail($user));
        Mail::mailer('mailtrap-sdk')->to($user->email)->send(new VerificaMail($user));

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
                'validado' => $user->validado,
                'codigo' => $user->codigo
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

        // Confirmação das crdenciais
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        // Verificação da validação do email
        else if ($user->validado !== "S") {
            return response()->json([
                'message' => 'Usuario não validado.'
            ], 400);
        }

        // Condição caso tudo esteja correto
        else {
            $user_token = new UserToken();
            $user_token->where('id_usuario', "=", $user->id)->delete();
            $user_token->id_usuario = $user->id;
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
    }

    // Logout
    public function logout(Request $request)
    {
        UserToken::where('id_usuario', "=", $request->id_usuario)->delete();

        return response()->json([
            'message' => 'Logout feito com sucesso.'
        ]);
    }

    // Verifica email
    public function verifica_email(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
            'codigo' => 'required'
        ]);

        $user = User::find($request->id);

        if ($user->codigo != $request->codigo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Código de verificação incorreto.'
            ], 400);
        }

        $user->validado = 'S';
        $user->save();

        return response()->json([
            'message' => 'Verificação finalizada com sucesso!'
        ], 200);
    }
}
