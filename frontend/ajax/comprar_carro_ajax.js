$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/retorna_carros",
        type: "GET",
        dataType: "json",
        success: function (response) {
            let carros = response.data;
            let container = $("#carrosContainer");
            container.empty();

            if (!carros || carros.length === 0) {
                container.append(`<p class="text-center text-white">Nenhum carro encontrado.</p>`);
                return;
            }

            carros.forEach(carro => {
                let imagem = carro.imagem
                    ? `http://127.0.0.1:8000/img/carros/${carro.imagem}`
                    : `https://via.placeholder.com/400x250?text=Sem+Imagem`;

                let precoFormatado = carro.preco
                    ? "R$ " + Number(carro.preco).toLocaleString("pt-BR")
                    : "Preço não informado";

                let card = `
                <div class="col-md-4 mb-4">
                    <div class="car-card">
                        <div class="car-image" style="background-image: url('${imagem}');"></div>
                        <div class="car-info">
                            <h3>${carro.marca || "Marca desconhecida"} ${carro.modelo || ""}</h3>
                            <p class="car-owner"><strong>Cor:</strong> ${carro.cor || "Não informado"}</p>
                            <p class="car-owner"><strong>Ano:</strong> ${carro.ano_fabricacao || "Não informado"}</p>
                            <p class="car-price">${precoFormatado}</p>

                            <!-- AQUI FOI ADICIONADO O data-id -->
                            <a href="#" class="btn-ver-carro ver_carro" data-id="${carro.id}">
                                Ver detalhes
                            </a>
                        </div>
                    </div>
                </div>`;

                container.append(card);
            });
        },
        error: function (xhr) {
            console.error(xhr.responseJSON);
            alert("Erro ao carregar os carros.");
        }
    });

    // Agora funciona porque foi adicionado o data-id no botão
    $(document).on("click", ".ver_carro", function (e) {
        e.preventDefault();

        let id = $(this).data("id");

        if (!id) {
            console.error("ERRO: Carro sem ID no botão.");
            return;
        }

        abrirModalCarro(id); // chama a função que busca e exibe o modal
    });

    // Abrir Modal
    function abrirModalCarro(id) {

        let token = localStorage.getItem("user_token");
        let id_usuario = localStorage.getItem("id_usuario");

        $.ajax({
            url: "http://127.0.0.1:8000/api/retorna_unico_carro/" + id,
            type: "GET",
            data: {
                id_usuario: id_usuario,
                token: token
            },
            dataType: "json",
            success: function (carro) {

                $("#carroTitulo").text(carro.marca + " " + carro.modelo);
                $("#carroImg").attr("src", carro.imagem_url ?? "");
                $("#carroMarca").text(carro.marca);
                $("#carroModelo").text(carro.modelo);
                $("#carroAno").text(carro.ano_fabricacao);
                $("#carroCor").text(carro.cor ?? "Não informado");
                $("#carroCarroceria").text(carro.carroceria ?? "Não informado");
                $("#carroCombustivel").text(carro.combustivel ?? "Não informado");
                $("#carroPreco").text("R$ " + carro.preco.toLocaleString("pt-BR"));
                $("#btnComprar").attr("data-id", carro.id);


                let modal = new bootstrap.Modal(document.getElementById("modalCarro"));
                modal.show();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert("Erro ao carregar detalhes do carro.");
            }
        });

    }
});



