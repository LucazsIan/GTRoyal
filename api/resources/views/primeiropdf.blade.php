<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF de Carros</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <h1>Lista de Carros</h1>

    <table>
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Cor</th>
                <th>Carroceria</th>
                <th>Combustível</th>
                <th>Quilometragem</th>
            </tr>
        </thead>
        <tbody>
            @foreach($carros as $carro)
                <tr>
                    <td>{{ $carro->marca }}</td>
                    <td>{{ $carro->modelo }}</td>
                    <td>{{ $carro->ano_fabricacao }}</td>
                    <td>{{ $carro->cor }}</td>
                    <td>{{ $carro->carroceria }}</td>
                    <td>{{ $carro->combustivel }}</td>
                    <td>{{ number_format($carro->quilometragem, 0, ',', '.') }} km</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
