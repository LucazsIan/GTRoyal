<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Carro;
use App\Models\User;

class CarroController extends Controller
{

    // Mostra tudo
    public function index()
    {
        return Carro::all();
    }

    // SALVA
    public function salvar(Request $request)
    {
       
        $carro = new Carro();
        $carro->marca = $request->marca;  
        $carro->modelo = $request->modelo;
        $carro->ano_fabricacao = $request->ano_fabricacao;
        $carro->cor = $request->cor;
        $carro->carroceria= $request->carroceria;
        $carro->combustivel = $request->combustivel;
        $carro->quilometragem = $request->quilometragem;
        $carro->preco = $request->preco;
        $carro->status = $request->status;
        $carro->id_usuario = $request->id_usuario;
        $carro->save();
  

       // $carro = $request->user()->carros()->create($fields);
        // $carro = $request->user()->carros()->create($fields);

        $data = ["carro" => $carro];
        return response()->json($data, 200);
    }



    // EDITA
    public function atualizar_carro(Request $request, $id){
        $carro = Carro::find($id);
    
        if (!$carro) {
            return response()->json(['message' => 'Carro não encontrado'], 404);
        }
    
        // Atualiza os campos
        $carro->marca = $request->marca ?? $carro->marca;
        $carro->modelo = $request->modelo ?? $carro->modelo;
        $carro->ano_fabricacao = $request->ano_fabricacao ?? $carro->ano_fabricacao;
        $carro->cor = $request->cor ?? $carro->cor;
        $carro->carroceria = $request->carroceria ?? $carro->carroceria;
        $carro->combustivel = $request->combustivel ?? $carro->combustivel;
        $carro->quilometragem = $request->quilometragem ?? $carro->quilometragem;
        $carro->preco = $request->preco ?? $carro->preco;
        $carro->status = $request->status ?? $carro->status;
        $carro->imagem = $request->imagem ?? $carro->imagem;
    
        $carro->save();

            // Busca o carro pelo ID
        return response()->json(['carro' => $carro], 200);
    }

    // DELETA
    public function deletar_carro($id)
    {
        $carro = Carro::find($id);
    
        if (!$carro) {
            return response()->json(['message' => 'Carro não encontrado'], 404);
        }
    
        $carro->delete();
    
        return response()->json(['message' => 'Carro deletado com sucesso'], 200);
    }

    //RETORNA CARROS
    public function retorna_carros(Request $request){
        $carro = Carro::get()->all();

        foreach( $carro as $a){

            $user = User::find($a['user_id']);

            $a['nome'] = $user->nome;
        }

        $data = [
            "erro" => 'n',
            "data" => $carro
        ];

        return response()->json($data,200);

    }



}
