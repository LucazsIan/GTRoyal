<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Verificação de Conta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 30px;
        }
        .container {
            max-width: 600px;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .codigo {
            font-size: 32px;
            font-weight: bold;
            color: #0d6efd;
            margin: 20px 0;
            letter-spacing: 2px;
        }
        .btn-verificar {
            margin-top: 20px;
            font-size: 16px;
            padding: 12px 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="mb-4">Conclua sua verificação</h2>
        <p>Olá! Para finalizar seu cadastro, utilize o código abaixo:</p>

        <div class="codigo">
            {{ $user->codigo }}
        </div>

        <p class="mt-3">Clique no botão abaixo para verificação do código:</p>

        <a href="http:/127.0.0.1:8000/verificacodigo/{{ $user->codigo }}" class="btn btn-success">
    Autentique seu e-mail aqui!
</a>


        <p class="mt-4 text-muted" style="font-size: 13px;">Se você não solicitou este e-mail, apenas ignore.</p>
    </div>
</body>
</html>