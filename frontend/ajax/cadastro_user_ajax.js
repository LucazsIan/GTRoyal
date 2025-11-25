$(document).ready(function () {
    $("#registrar").click(function () {

        $.ajax({
            url: "http://127.0.0.1:8000/api/register",
            type: "POST",
            data: {
                nome: $("#nome").val(),
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
                localStorage.setItem("userid", response.user.id);
                console.log("Storage user id:", localStorage.getItem("userid"));
                alert("Cadastro feito com sucesso!");
                window.location.href = "./verifica_email.html";
            },
            error: function (xhr) {

                alert("Ocorreu um erro. Tente novamente mais tarde.");

            }
        });
    });
});
