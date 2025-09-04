$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault(); // Evita o envio normal do form

        // Dados do formulário
        var dados = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            url: "http://127.0.0.1:8000/api/login", // Ajuste para a rota real do seu backend
            method: "POST",
            data: dados,
            dataType: "json",
            success: function (response) {
                // Login bem-sucedido
                alert("Login feito com sucesso!");
                console.log(response);

                // Você pode salvar o token no localStorage ou sessionStorage
                localStorage.setItem("user_token", response.token);
                localStorage.setItem("user_id", response.user.id);

                // Redirecionar ou atualizar a página
                // window.location.href = "/dashboard";
            },
            error: function (xhr) {
                // Login falhou
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
