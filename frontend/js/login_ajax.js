// login_ajax.js
document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!loginBtn || !emailInput || !passwordInput) {
        console.error("Botão de login ou inputs não encontrados!");
        return;
    }

    loginBtn.addEventListener("click", async function (e) {
        e.preventDefault(); // previne comportamento padrão

        const data = {
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        if (!data.email || !data.password) {
            alert("⚠️ Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.token) {
                alert("✅ Login realizado com sucesso!");

                // Somente campos seguros do usuário
                const user = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                };
                console.log("Usuário:", user);
                console.log("Token:", result.token);

                // Salva token no localStorage
                localStorage.setItem("auth_token", result.token);

                // Redirecionamento opcional
                // window.location.href = "/dashboard.html";

                // Limpa o formulário
                

            } else {
                let mensagens = "";
                if (result.errors) {
                    for (const campo in result.errors) {
                        mensagens += result.errors[campo].join("\n") + "\n";
                    }
                } else {
                    mensagens = result.message || "Credenciais incorretas.";
                }
                alert("⚠️ Erro no login:\n" + mensagens);
            }

        } catch (error) {
            console.error("Erro ao tentar logar:", error);
            alert("⚠️ Ocorreu um erro inesperado. Tente novamente.");
        }
    });

});
