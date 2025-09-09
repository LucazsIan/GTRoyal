$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        var dados = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/login",
            method: "POST",
            data: dados,
            dataType: "json",
            success: function (response) {

                localStorage.setItem("user_token", response.token);
                localStorage.setItem("id_usuario", response.user.id);
                console.log("Token:", localStorage.getItem("user_token"));
                console.log("User ID:", localStorage.getItem("id_usuario"));

                alert("Login feito com sucesso!");

                console.log(response);
                window.location.href = "./registro_carro.html";
            },
            error: function (xhr) {

                if (xhr.status === 401) {
                    alert("E-mail ou senha incorretos.");
                } else {
                    alert("Ocorreu um erro. Tente novamente.");
                }
                console.log(xhr.responseJSON);
            }
        });
    });
});



