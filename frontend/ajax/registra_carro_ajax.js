$(document).ready(function () {
    $("#registrar_carro").click(function (e) {
        e.preventDefault(); // Evita envio padrão do form

        // Limpa mensagens de erro antigas
        $(".text-danger").text("").removeAttr("aria-invalid");

        // Coleta dados do formulário
        let dados = {
            marca: $("#marca").val(),
            modelo: $("#modelo").val(),
            ano_fabricacao: $("#ano_fabricacao").val(),
            cor: $("#cor").val(),
            carroceria: $("#carroceria").val(),
            combustivel: $("#combustivel").val(),
            quilometragem: $("#quilometragem").val(),
            preco: $("#preco").val(),
            status: "0",            // ou outro valor padrão
            id_usuario: 1,
            token: "c5ba53a126e6b8316e4eeb11f37ae057"
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/salva_carro",
            method: "POST",
            data: dados,
            success: function (response) {
                alert("Carro registrado sucesso!");
                $("#registra_carro_form")[0].reset();
            },
            error: function (xhr) {
                if (xhr.status === 422) {
                    let errors = xhr.responseJSON.errors;

                    // Para cada campo com erro
                    $.each(errors, function (key, mensagens) {
                        let errorDiv = $("#" + key + "Error");
                        if (errorDiv.length) {
                            errorDiv.text(mensagens[0]).attr("aria-invalid", "true");
                        }
                    });
                } else {
                    // Outros erros
                    alert("Ocorreu um erro. Tente novamente mais tarde.");
                }
            }
        });
    });
});
