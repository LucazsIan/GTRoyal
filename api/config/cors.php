<?php

return [

    /*
    |----------------------------------------------------------------------
    | Paths
    |----------------------------------------------------------------------
    |
    | Define quais URLs ou padrões de URL irão se beneficiar das configurações de CORS.
    |
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Caminhos da sua API ou outras rotas

    /*
    |----------------------------------------------------------------------
    | Allowed Methods
    |----------------------------------------------------------------------
    |
    | Quais métodos HTTP são permitidos (GET, POST, PUT, DELETE, OPTIONS, etc.)
    | Use '*' para permitir todos os métodos.
    |
    */
    'allowed_methods' => ['*'],  // Permite todos os métodos HTTP

    /*
    |----------------------------------------------------------------------
    | Allowed Origins
    |----------------------------------------------------------------------
    |
    | Defina os domínios que são permitidos para acessar a API.
    | Use '*' para permitir todas as origens (não recomendado para produção).
    |
    */
    'allowed_origins' => ['http://localhost:3000'],  // Substitua pela URL do seu front-end

    /*
    |----------------------------------------------------------------------
    | Allowed Origins Patterns
    |----------------------------------------------------------------------
    |
    | Aqui você pode definir padrões para as origens permitidas.
    |
    */
    'allowed_origins_patterns' => [],

    /*
    |----------------------------------------------------------------------
    | Allowed Headers
    |----------------------------------------------------------------------
    |
    | Defina quais cabeçalhos de requisição são permitidos.
    | Use '*' para permitir todos os cabeçalhos.
    |
    */
    'allowed_headers' => ['*'],  // Permite todos os cabeçalhos

    /*
    |----------------------------------------------------------------------
    | Exposed Headers
    |----------------------------------------------------------------------
    |
    | Quais cabeçalhos podem ser acessados pela aplicação cliente.
    |
    */
    'exposed_headers' => [],  // Deixe vazio se não precisar expor cabeçalhos adicionais

    /*
    |----------------------------------------------------------------------
    | Max Age
    |----------------------------------------------------------------------
    |
    | O tempo que os navegadores podem armazenar o resultado de uma requisição OPTIONS em cache (em segundos).
    |
    */
    'max_age' => 0,  // Defina o tempo desejado (ex: 3600 para 1 hora)

    /*
    |----------------------------------------------------------------------
    | Supports Credentials
    |----------------------------------------------------------------------
    |
    | Se as credenciais (cookies, autenticação HTTP) são permitidas nas requisições CORS.
    |
    */
    'supports_credentials' => true,  // Permite autenticação com cookies ou tokens
];
