// CADASTRO
document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("registrar");
    const form = document.querySelector("form");

    if (!registerBtn || !form) {
        console.error("Botão de registrar ou formulário não encontrados!");
        return;
    }

    registerBtn.addEventListener("click", async function (e) {
        e.preventDefault();

        // Coleta os dados do formulário
        const formData = new FormData(form);

        // Monta objeto para enviar ao Laravel
        const data = {
            name: formData.get("nome") + " " + formData.get("sobrenome"),
            email: formData.get("email"),
            password: formData.get("password"),
            password_confirmation: formData.get("password_confirmation") // <== CORRETO
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Cadastro realizado com sucesso!");

                // Filtra dados sensíveis do usuário
                const user = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                };

                console.log("Usuário:", user);
                console.log("Token:", result.token);

                // Salva token no localStorage
                localStorage.setItem("auth_token", result.token);

                // Limpa o formulário
                form.reset();

            } else {
                // Mostra erros de validação do Laravel
                let mensagens = "";
                if (result.errors) {
                    for (const campo in result.errors) {
                        mensagens += result.errors[campo].join("\n") + "\n";
                    }
                } else {
                    mensagens = result.message;
                }
                alert("⚠️ Erro no cadastro:\n" + mensagens);
            }
        } catch (error) {
            console.error("Erro inesperado:", error);
            alert("❌ Erro ao conectar com o servidor.");
        }
    });
});
