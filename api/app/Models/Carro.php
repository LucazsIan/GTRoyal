<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carro extends Model
{
    public $timestamps = true;
    protected $table = 'carros';

    protected $fillable = [
        'id_usuario',
        'marca',
        'modelo',
        'ano_fabricacao',
        'cor',
        'carroceria',
        'combustivel',
        'quilometragem',
        'preco',
        'status',
        'imagem',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    protected $casts = [
        'preco' => 'decimal:2',
        'quilometragem' => 'integer', 
    ];

}
