$(document).ready(function () {
  new DataTable("#tabela_categoria", {
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
      url: "../api/retorna_carros",
      type: "GET",
      data: function (d) {
        d.user_id = $("#user_id").val(); //lembrar que o meu é diferente
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
      { data: "quilometragem,", title: "Quilometragem" },
      { data: "preco", title: "Preço" },
      { data: "status", title: "Status" },
      {
        data: "id",
        title: "Ações",
        render: function (data, type, row) {
          return `
                    <div class="row d-flex">
                        <div class=" col-6">
                            <button class="btn btn-warning btn-sm alterar" data-id="${data}">Alterar</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-danger btn-sm deletar" data-id="${data}">Excluir</button>
                        </div>

                    </div>`;
        },
      },
    ],
  });
});
