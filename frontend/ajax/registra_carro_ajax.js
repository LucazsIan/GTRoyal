$(document).ready(function () {

    // Autenticação
    let token = localStorage.getItem("user_token");
    let id_usuario = localStorage.getItem("id_usuario");
    console.log("User ID:", id_usuario);
    console.log("Token:", token);
    var dados = {
        id_usuario: id_usuario,
        token: token
    };

    // Pega ID do carro da query string
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("id");

    if (carId) {
        $("#div_registrar").hide();
        $("#div_modificar").show();
        carregarCarro(carId);
    } else {
        $("#div_modificar").hide();
        $("#div_registrar").show();
    }

    // REGISTRAR CARRO
    $("#registrar_carro").click(function (e) {
        e.preventDefault();

        $(".text-danger").text("").removeAttr("aria-invalid");


        if (!token || !id_usuario) {
            alert("Erro: usuário não autenticado. Faça o login para registrar carros.");
            return;
        }

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
                window.location.replace("./minha_garagem.html");
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

    // CARREGAR INFORMAÇÕES DO CARRO QUE VAI SER EDITADO
    function carregarCarro(carId) {
        $.ajax({
            url: `http://127.0.0.1:8000/api/retorna_unico_carro/${carId}`,
            method: "GET",
            data: dados,
            dataType: "json",
            success: function (carro) {
                // Preenche os inputs do formulário
                $("#marca").val(carro.marca);
                $("#modelo").val(carro.modelo);
                $("#ano_fabricacao").val(carro.ano_fabricacao);
                $("#cor").val(carro.cor);
                $("#carroceria").val(carro.carroceria);
                $("#combustivel").val(carro.combustivel);
                $("#quilometragem").val(carro.quilometragem);
                $("#preco").val(carro.preco);

                // Se existir imagem, mostra o preview
                if (carro.imagem_url) {
                    $("#imagePreviewContainer").removeClass("d-none");
                    $("#preview").attr("src", carro.imagem_url);
                }
            },
            error: function (xhr) {
                console.log(xhr.responseJSON);
                alert("Erro ao carregar os dados do carro.");
            }
        });
    }

    // EDITAR CARRO
    $('#editar_carro').click(function (e) {

        e.preventDefault();

        $(".text-danger").text("").removeAttr("aria-invalid");

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
            url: `http://127.0.0.1:8000/api/edita_carro/${carId}`,
            method: "POST",
            headers: { "X-HTTP-Method-Override": "PUT" },
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",

            success: function (response) {
                alert("Carro atualizado com sucesso!");
                window.location.replace("./minha_garagem.html");
            },

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
                    alert("Ocorreu um erro ao atualizar o carro. Tente novamente mais tarde.");
                }
            }
        });

    });

    // DELETAR CARRO
    $('#deletar_carro').click(function (e) {

        e.preventDefault();

        $(".text-danger").text("").removeAttr("aria-invalid");

        $.ajax({
            url: `http://127.0.0.1:8000/api/deleta_carro/${carId}`,
            method: "DELETE",
            data: dados,
            dataType: "json",
            success: function (carro) {
                alert("Carro deletado com sucesso!");
                window.location.replace("./minha_garagem.html");
            },
            error: function (xhr) {
                console.log(xhr.responseJSON);
                alert("Erro ao carregar os dados do carro.");
            }
        });
    });
});
