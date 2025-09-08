$(document).ready(function () {

    // Autenticação 
    let token = localStorage.getItem("user_token");
    let id_usuario = localStorage.getItem("id_usuario");
    console.log("Token:", token);
    console.log("User ID:", id_usuario);
    var dados = {
        id_usuario: id_usuario,
        token: token
    };


    $.ajax({
        url: "http://127.0.0.1:8000/api/minha_garagem",
        method: "get",
        data: dados,
        dataType: "json",
        success: function (response) {

            console.log(response);

            // Adiciona os cards dinamicamente
            response.carros.forEach(car => {
                $(".slider").append(`
                    <div class="item aling-items-center">
                        <h1 class="pt-2">ROYAL</h1>
                        <img class="card_img" src="${car.imagem_url || ''}" alt="${car.marca} ${car.modelo}" style="height:170px;">
                        <h5 class="my-2">${car.marca} ${car.modelo}</h5>
                        <div class="card_infos text-start w-100 pb-2 px-3">
                            <div class="row mb-2">
                                <div class="col-6">Ano:</div>
                                <div class="col-6 text-end">${car.ano_fabricacao}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6">Cor:</div>
                                <div class="col-6 text-end">${car.cor || 'N/A'}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6">Carroceria:</div>
                                <div class="col-6 text-end">${car.carroceria || 'N/A'}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6">Combustivel:</div>
                                <div class="col-6 text-end">${car.combustivel || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                `);
            });

            initSlider();

        },
        error: function (xhr) {
            console.log(xhr.responseJSON);
            alert("Erro ao carregar os carros.");
        }
    });

});
