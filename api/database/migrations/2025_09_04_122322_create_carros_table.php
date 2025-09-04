<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carros', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('id_usuario')->constrained('users')->onDelete('cascade');
            $table->string('marca');
            $table->string('modelo');
            $table->integer('ano_fabricacao')->nullable(false); // Garantir que não seja nulo
            $table->string('cor');
            $table->string('carroceria');
            $table->string('combustivel');
            $table->bigInteger('quilometragem');
            $table->decimal('preco', 15, 2);
            $table->integer('status')->nullable(false);  // Garantir que o status não seja nulo
            $table->string('imagem')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carros');
    }
};
