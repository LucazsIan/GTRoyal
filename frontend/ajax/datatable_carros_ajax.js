$(document).ready(function () {


  // Autenticação 
  let token = localStorage.getItem("user_token");
  let id_usuario = localStorage.getItem("id_usuario");
  console.log("User ID:", id_usuario);
  console.log("Token:", token);
  var dados = {
    id_usuario: id_usuario,
    token: token
  };

  let tabelaCarros = new DataTable("#tabela_carros", {
    processing: true,
    serverSide: false,
    responsive: true,
    paging: true,
    pageLength: 5,
    lengthChange: false,
    searching: true,
    ordering: true,
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json",
    },
    ajax: {
      url: "http://127.0.0.1:8000/api/retorna_carros",
      type: "GET",
      data: function (d) {
        d.id_usuario = $("#id_usuario").val(); //lembrar que o meu é diferente
        d.token = $("#token").val();
      },
      dataSrc: "data",
    },
    columns: [
      { data: "id", title: "ID" },
      { data: "id_usuario", title: "ID Dono" },
      { data: "marca", title: "Marca" },
      { data: "modelo", title: "Modelo" },
      { data: "ano_fabricacao", title: "Ano de fabricação" },
      { data: "cor", title: "Cor" },
      { data: "carroceria", title: "Carroceria" },
      { data: "combustivel", title: "Combustivel" },
      { data: "quilometragem", title: "Quilometragem" },
      { data: "preco", title: "Preço" },
      { data: "status", title: "Status" },
      {
        data: "id",
        title: "Ações",
        render: function (data, type, row) {
          return `
                    <div class="row d-flex">
                        <div class=" col-6">
                            <button class="btn btn-warning btn-sm edit-car" data-id="${data}">Editar</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-danger btn-sm delete-car" data-id="${data}">Excluir</button>
                        </div>
                    </div>`;
        },
      },
    ],
  });

  // REDIRECIONANDO CARRO PARA EDIÇÃO
  $(document).on("click", ".edit-car", function () {
    let carId = $(this).data("id");
    window.location.href = "./registro_carro.html?id=" + carId;
  });

  // REDIRECIONANDO CARRO PARA EDIÇÃO
  $(document).on("click", ".add-car", function () {
    window.location.href = "./registro_carro.html";
  });

  // EXCLUIR 
  $(document).on("click", ".delete-car", function (e) {

    e.preventDefault();

    $(".text-danger").text("").removeAttr("aria-invalid");

    let carId = $(this).data("id");

    $.ajax({
      url: `http://127.0.0.1:8000/api/deleta_carro/${carId}`,
      method: "DELETE",
      data: dados,
      dataType: "json",
      success: function (carro) {

        tabelaCarros.ajax.reload();
      },
      error: function (xhr) {
        console.log(xhr.responseJSON);
        alert("Erro ao carregar os dados do carro.");
      }
    });
  });

  // $(document).on('click', '.alterar_carro', function () {
  //   let id = $(this).data('id');
  //   let ativo = 0;
  //   if ($(this).is(':checked')) {
  //     ativo = 1;
  //   }

  //   // CHAMAR AJAX

  //   // LINHA IMPORTANTE PROFESSOR
  //   tableCarros.ajax.reload();
  // });
});
