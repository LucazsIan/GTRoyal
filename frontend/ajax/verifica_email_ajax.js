$(document).on('click', '#verificar', function (e) {
    e.preventDefault();
    console.log("clicou");

    var codigo1 = $('#codigo1').val();
    var codigo2 = $('#codigo2').val();
    var codigo3 = $('#codigo3').val();
    var codigo4 = $('#codigo4').val();

    if (!codigo1 || !codigo2 || !codigo3 || !codigo4) {
        alert('Por favor, preencha todos os campos do código.');
        return;
    }

    var codigo = codigo1 + codigo2 + codigo3 + codigo4;
    const userId = localStorage.getItem("userid");

    if (!userId) {
        alert('ID do usuário não encontrado. Faça o cadastro novamente.');
        return;
    }

    $.ajax({
        url: "http://127.0.0.1:8000/api/verifica_email",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            id: userId,
            codigo: codigo
        }),
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr) {
            var errorMessage = xhr.responseJSON?.message || "Erro inesperado";
            alert(errorMessage);
        }
    });
});
