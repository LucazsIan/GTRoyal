<div>
   <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Verificação de Código</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .verificacao-container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 300px;
    }

    .verificacao-container h2 {
      margin-bottom: 20px;
      text-align: center;
    }

    input[type="text"], input[type="email"] {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background-color: #45a049;
    }

    .mensagem {
      margin-top: 15px;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <div class="verificacao-container">
    <h2>Confirmar Código</h2>
    <input type="text" id="nome" placeholder="Digite seu nome" required>
    <input type="email" id="email" placeholder="Digite seu e-mail" required>
    <input type="text" id="codigo" placeholder="Digite o código" required>
    <button onclick="verificarCodigo()">Verificar</button>
    <div class="mensagem" id="mensagem"></div>
  </div>



</body>
</html>
