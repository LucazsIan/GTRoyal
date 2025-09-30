$(document).ready(function () {

    // Pega ID do carro da query string
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (!userId) {
        alert('ID do usuário não encontrado na URL.');
        return;
    }

    $('#codigoForm').submit(function (e) {
        e.preventDefault();

        console.log("oi")

        var codigo1 = $('#codigo1').val();
        var codigo2 = $('#codigo2').val();
        var codigo3 = $('#codigo3').val();
        var codigo4 = $('#codigo4').val();

        if (!codigo1 || !codigo2 || !codigo3 || !codigo4) {
            alert('Por favor, preencha todos os campos do código.');
            return;
        }

        var codigo = codigo1 + codigo2 + codigo3 + codigo4;

        $.ajax({
            url: `http://127.0.0.1:8000/api/verifica_email/${userId}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ codigo: codigo }),
            success: function (response) {
                alert(response.message);
            },
            error: function (xhr) {
                var errorMessage = xhr.responseJSON.message;
                alert(errorMessage);
            }
        });
    });
});
