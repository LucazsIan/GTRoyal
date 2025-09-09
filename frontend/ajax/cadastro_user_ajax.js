$(document).ready(function () {
    $("#registrar").click(function (e) {
        e.preventDefault();

        $(".text-danger").text("").removeAttr("aria-invalid");

        let dados = {
            nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            email: $("#email").val(),
            telefone: $("#telefone").val(),
            data_nasc: $("#data_nascimento").val(),
            pais: $("#pais").val(),
            cep: $("#cep").val(),
            password: $("#password").val(),
            password_confirmation: $("#password_confirmation").val(),
            aceito_termos: $("#aceito_termos").is(":checked") ? 1 : 0
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/register",
            method: "POST",
            data: dados,
            success: function (response) {
                alert("Cadastro realizado com sucesso!");
                $("#cadastroForm")[0].reset();
                window.location.href = "./login_user.html";
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
                } else {
                    // Outros erros
                    alert("Ocorreu um erro. Tente novamente mais tarde.");
                }
            }
        });
    });
});
