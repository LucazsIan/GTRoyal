<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Carro;
use App\Models\User;

class CarroController extends Controller
{

    // SALVA
    public function salvar_carro(Request $request)
    {

        $carro = new Carro();
        $carro->marca = $request->marca;
        $carro->modelo = $request->modelo;
        $carro->ano_fabricacao = $request->ano_fabricacao;
        $carro->cor = $request->cor;
        $carro->carroceria = $request->carroceria;
        $carro->combustivel = $request->combustivel;
        $carro->quilometragem = $request->quilometragem;
        $carro->preco = $request->preco;
        $carro->status = $request->status;
        $carro->id_usuario = $request->id_usuario;
        $carro->save();
 
        $data = ["carro" => $carro];
        return response()->json($data, 200);

        // $carro = $request->user()->carros()->create($fields);
    }


    // EDITA
    public function editar_carro(Request $request, $id)
    {
        $carro = Carro::find($id);

        if (!$carro) {
            return response()->json(['message' => 'Carro não encontrado'], 404);
        }

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
    public function retornar_carros(Request $request)
    {

        $carro = Carro::get()->all();

        $data = [
            "erro" => 'n',
            "data" => $carro
        ];

        return response()->json($data, 200);
    }
}
