function logout() {
    console.log("Llslslsl")

    let token = localStorage.getItem("user_token");
    let id_usuario = localStorage.getItem("id_usuario");

    if (!token || !id_usuario) {
        alert("Nenhum usuário logado.");
        return;
    }

    $.ajax({
        url: "http://127.0.0.1:8000/api/logout",
        method: "POST",
        data: {
            id_usuario: id_usuario,
            token: token
        },
        dataType: "json",
        success: function (response) {

            console.log("Logout:", response);

            // Limpa localStorage
            localStorage.removeItem("user_token");
            localStorage.removeItem("id_usuario");

            // Limpa cookies
            document.cookie = "user_token=; path=/; max-age=0";
            document.cookie = "id_usuario=; path=/; max-age=0";

            alert("Logout feito com sucesso!");

            // Redireciona
            window.location.href = "inicial.html";
        },
        error: function (xhr) {
            console.log(xhr.responseJSON);
            alert("Erro ao fazer logout.");
        }
    });
}
