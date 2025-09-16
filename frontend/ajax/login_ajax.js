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

                // Salva no storage
                localStorage.setItem("user_token", response.token);
                localStorage.setItem("id_usuario", response.user.id);

                // Exibe o storage Console log
                console.log("Storage Token:", localStorage.getItem("user_token"));
                console.log("Storage User ID:", localStorage.getItem("id_usuario"));

                // Salva no cookies
                document.cookie = "user_token=" + response.token + "; path=/; max-age=3600";
                document.cookie = "id_usuario=" + response.user.id + "; path=/; max-age=3600";

                // Exibe o cookie Console log
                console.log("Cookies Token:", getCookie("user_token"));
                console.log("Cookies Token:", getCookie("id_usuario"));

                alert("Login feito com sucesso!");

                console.log(response);
                // window.location.href = "./registro_carro.html";
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


    // Função resgata token no cookie
    function getCookie(nome) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const c = cookies[i].trim();
            if (c.indexOf(nome + "=") === 0) {
                return c.substring((nome + "=").length, c.length);
            }
        }
        return null;
    }
});



