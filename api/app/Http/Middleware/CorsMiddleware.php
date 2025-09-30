<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Permitir todas as origens (isso é inseguro para produção, use com cautela)
        // Defina quais origens você quer permitir em produção.
        $allowedOrigins = ['*'];  // ou ['https://meusite.com']

        // Adicionando cabeçalhos CORS
        $response = $next($request);

        // Verifica se a origem da requisição está permitida
        $origin = $request->headers->get('Origin');
        if (in_array($origin, $allowedOrigins) || in_array('*', $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }

        // Se for uma requisição OPTIONS, apenas retorna os cabeçalhos de CORS
        if ($request->getMethod() == "OPTIONS") {
            return response()->json([], 200);
        }

        return $response;
    }
}
