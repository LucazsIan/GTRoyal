$(document).ready(function () {
    $("#registrar").click(function (e) {
        e.preventDefault(); // Evita envio padrão do form

        // Limpa mensagens de erro antigas
        $(".text-danger").text("").removeAttr("aria-invalid");

        // Coleta dados do formulário
        let dados = {
            nome: $("input[name='nome']").val(),
            sobrenome: $("input[name='sobrenome']").val(),
            email: $("input[name='email']").val(),
            telefone: $("input[name='telefone']").val(),
            data_nasc: $("input[name='data_nascimento']").val(),
            pais: $("input[name='pais']").val(),
            cep: $("input[name='cep']").val(),
            password: $("input[name='password']").val(),
            password_confirmation: $("input[name='password_confirmation']").val(),
            aceito_termos: $("input[name='aceito_termos']").is(":checked") ? 1 : 0
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/register", // Ajuste para sua rota de cadastro
            method: "POST",
            data: dados,
            success: function (response) {
                // Feedback de sucesso
                alert("Cadastro realizado com sucesso!");
                $("#cadastroForm")[0].reset(); // Limpa formulário
                window.location.href = "./login_user.html";
            },
            error: function (xhr) {
                if (xhr.status === 422) {
                    // Erros de validação do Laravel
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
