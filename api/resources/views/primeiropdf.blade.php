<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf</title>
</head>
<body>
    @foreach($usuarios as $u)
    <h1>{{ $u->email }}</h1>
    @endforeach
</body>
</html>