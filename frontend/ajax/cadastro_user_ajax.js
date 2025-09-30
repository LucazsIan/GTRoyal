$(document).ready(function () {
    $("#registrar").click(function (e) {
        

        $(".text-danger").text("").removeAttr("aria-invalid");

        let dados = {
           
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/register",
            type: "POST",
            data: { nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            email: $("#email").val(),
            telefone: $("#telefone").val(),
            data_nasc: '1995-01-01',
            pais: $("#pais").val(),
            cep: $("#cep").val(),
            password: $("#password").val(),
            password_confirmation: $("#password_confirmation").val()
        },
            success: function (response) {
                console.log(response);
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
