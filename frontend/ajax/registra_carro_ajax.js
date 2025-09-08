$(document).ready(function () {

    // Autenticação
    let token = localStorage.getItem("user_token");
    let id_usuario = localStorage.getItem("id_usuario");
    console.log("User ID:", id_usuario);
    console.log("Token:", token);

    $("#registrar_carro").click(function (e) {
        e.preventDefault();

        $(".text-danger").text("").removeAttr("aria-invalid");


        if (!token || !id_usuario) {
            alert("Erro: usuário não autenticado. Faça o login para registrar carros.");
            return;
        }

        // Colocando informações pelo FormData
        let formData = new FormData();
        formData.append("marca", $("#marca").val());
        formData.append("modelo", $("#modelo").val());
        formData.append("ano_fabricacao", $("#ano_fabricacao").val());
        formData.append("cor", $("#cor").val());
        formData.append("carroceria", $("#carroceria").val());
        formData.append("combustivel", $("#combustivel").val());
        formData.append("quilometragem", $("#quilometragem").val());
        formData.append("preco", $("#preco").val());
        formData.append("status", "0");
        formData.append("id_usuario", id_usuario);
        formData.append("token", token);

        // Imagem
        let file = $("#imagem")[0].files[0];
        if (file) {
            formData.append("imagem", file);
        }

        $.ajax({
            url: "http://127.0.0.1:8000/api/registra_carro",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,

            // Sucesso
            success: function (response) {
                alert("Carro registrado sucesso!");
                window.location.href = "./minha_garagem.html";
                
            },

            // Erro
            error: function (xhr) {
                if (xhr.status === 422) {
                    let errors = xhr.responseJSON.errors;
                    $.each(errors, function (key, mensagens) {
                        let errorDiv = $("#" + key + "Error");
                        if (errorDiv.length) {
                            errorDiv.text(mensagens[0]).attr("aria-invalid", "true");
                        }
                    });
                } else if (xhr.status === 401) {
                    alert("Erro de autenticação: faça login novamente.");
                } else {
                    alert("Ocorreu um erro. Tente novamente mais tarde.");
                }
            }
        });
    });
});
