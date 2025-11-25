$(document).ready(function () {

    // Autenticação 
    let token = localStorage.getItem("user_token");
    let id_usuario = localStorage.getItem("id_usuario");
    console.log("User ID:", id_usuario);
    console.log("Token:", token);

    if (token) {
        console.log("Usuário logado → mostrando AUTH");

        // FORÇA ABSOLUTA para mostrar
        $("#nav-auth").removeClass("d-none").css("display", "flex");
        $("#nav-right-auth").removeClass("d-none").css("display", "flex");

        // FORÇA ABSOLUTA para esconder
        $("#nav-guest").addClass("d-none").hide();
        $("#nav-right-guest").addClass("d-none").hide();

    } else {

        console.log("Usuário NÃO logado → mostrando GUEST");

        $("#nav-auth").addClass("d-none").hide();
        $("#nav-right-auth").addClass("d-none").hide();

        $("#nav-guest").removeClass("d-none").css("display", "flex");
        $("#nav-right-guest").removeClass("d-none").css("display", "flex");
    }
});
