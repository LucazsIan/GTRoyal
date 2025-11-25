document.addEventListener('DOMContentLoaded', () => {
    const mainGrid = document.getElementById('main-grid');
    const profileSection = document.getElementById('profile-section');
    const commentsSection = document.getElementById('comments-section');
    const helpCenterSection = document.getElementById('help-center-section');
    const ratingsSection = document.getElementById('ratings-section');
    const privacyPolicySection = document.getElementById('privacy-policy-section');
    const notificationsSection = document.getElementById('notifications-section');
    const termsOfUseSection = document.getElementById('terms-of-use-section');
    const plansSection = document.getElementById('plans-section');
    const mainTitle = document.getElementById('main-title');
    const logoutButton = document.getElementById('logout-button');
    const optionButtons = document.querySelectorAll('.option-button');
    const profileButton = document.getElementById('profile-button');
    const commentsButton = document.getElementById('comments-button');
    const helpCenterButton = document.getElementById('help-center-button');
    const ratingsButton = document.getElementById('ratings-button');
    const privacyPolicyButton = document.getElementById('privacy-policy-button');
    const notificationsButton = document.getElementById('notifications-button');
    const termsOfUseButton = document.getElementById('terms-of-use-button');
    const plansButton = document.getElementById('plans-button');
    const sendCommentsMessageButton = document.getElementById('send-comments-message-button');
    const commentsMessageInput = document.getElementById('comments-message-input');
    const sendHelpMessageButton = document.getElementById('send-help-message-button');
    const helpMessageInput = document.getElementById('help-message-input');
    const backButton = document.getElementById('back-button');
    const messageBox = document.getElementById('message-box');
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('rating-message');
    const notificationsList = document.getElementById('notifications-list');
    const saveProfileButton = document.getElementById('save-profile-button');

    let currentSection = 'main';

    function showTemporaryMessage(message) {
        messageBox.textContent = message;
        messageBox.classList.remove('opacity-0');
        setTimeout(() => {
            messageBox.classList.add('opacity-0');
        }, 3000); // Esconde a mensagem depois de 3 segundos
    }

    // Lida com a exibição de seções
    function showSection(sectionToShow) {
        mainGrid.classList.add('hidden');
        profileSection.classList.add('hidden');
        commentsSection.classList.add('hidden');
        helpCenterSection.classList.add('hidden');
        ratingsSection.classList.add('hidden');
        privacyPolicySection.classList.add('hidden');
        notificationsSection.classList.add('hidden');
        termsOfUseSection.classList.add('hidden');
        plansSection.classList.add('hidden');

        if (sectionToShow === 'profile') {
            profileSection.classList.remove('hidden');
            currentSection = 'profile';
            mainTitle.textContent = "Meu Perfil";
        } else if (sectionToShow === 'comments') {
            commentsSection.classList.remove('hidden');
            currentSection = 'comments';
            mainTitle.textContent = "Comentários";
        } else if (sectionToShow === 'help') {
            helpCenterSection.classList.remove('hidden');
            currentSection = 'help';
            mainTitle.textContent = "Central de Ajuda";
        } else if (sectionToShow === 'ratings') {
            ratingsSection.classList.remove('hidden');
            currentSection = 'ratings';
            mainTitle.textContent = "Avaliações";
        } else if (sectionToShow === 'privacy') {
            privacyPolicySection.classList.remove('hidden');
            currentSection = 'privacy';
            mainTitle.textContent = "Política de Privacidade";
        } else if (sectionToShow === 'notifications') {
            notificationsSection.classList.remove('hidden');
            currentSection = 'notifications';
            mainTitle.textContent = "Notificações";
        } else if (sectionToShow === 'terms') {
            termsOfUseSection.classList.remove('hidden');
            currentSection = 'terms';
            mainTitle.textContent = "Termos de Uso";
        } else if (sectionToShow === 'plans') {
            plansSection.classList.remove('hidden');
            currentSection = 'plans';
            mainTitle.textContent = "Planos";
        } else {
            mainGrid.classList.remove('hidden');
            currentSection = 'main';
            mainTitle.textContent = "Configurações";
        }
    }

    // Exibe a seção de "Perfil"
    profileButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('profile');
    });

    // Exibe a seção de "Comentários"
    commentsButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('comments');
    });

    // Exibe a seção de "Central de Ajuda"
    helpCenterButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('help');
    });

    // Exibe a seção de "Avaliações"
    ratingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('ratings');
    });

    // Exibe a seção de "Política de Privacidade"
    privacyPolicyButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('privacy');
    });

    // Exibe a seção de "Notificações"
    notificationsButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('notifications');
    });

    // Exibe a seção de "Termos de uso"
    termsOfUseButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('terms');
    });

    // Exibe a seção de "Planos/Mensalidades"
    plansButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('plans');
    });

    // Lida com o clique no botão de "Salvar Alterações" do perfil
    saveProfileButton.addEventListener('click', () => {
        showTemporaryMessage('Seu perfil foi atualizado!');
    });

    // Lida com o clique no botão de "Enviar" de comentários
    sendCommentsMessageButton.addEventListener('click', () => {
        const message = commentsMessageInput.value.trim();
        if (message) {
            showTemporaryMessage('Sua mensagem para o dono foi enviada!');
            commentsMessageInput.value = ''; // Limpa o campo
            setTimeout(() => {
                showSection('main');
            }, 2000);
        } else {
            showTemporaryMessage('Por favor, digite sua mensagem antes de enviar.');
        }
    });

    // Lida com o clique no botão de "Enviar" da Central de Ajuda
    sendHelpMessageButton.addEventListener('click', () => {
        const message = helpMessageInput.value.trim();
        if (message) {
            showTemporaryMessage('Sua mensagem foi enviada. Entraremos em contato em breve!');
            helpMessageInput.value = ''; // Limpa o campo
            setTimeout(() => {
                showSection('main');
            }, 2000);
        } else {
            showTemporaryMessage('Por favor, digite sua mensagem antes de enviar.');
        }
    });

    // Lida com o botão "Voltar"
    backButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentSection === 'main') {
            showTemporaryMessage('Você clicou em Voltar.');
        } else {
            showSection('main');
        }
    });

    // Lida com o clique em outros botões de opção
    optionButtons.forEach(button => {
        if (button.id !== 'profile-button' && button.id !== 'help-center-button' && button.id !== 'ratings-button' && button.id !== 'privacy-policy-button' && button.id !== 'comments-button' && button.id !== 'notifications-button' && button.id !== 'terms-of-use-button' && button.id !== 'plans-button') {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const topic = button.getAttribute('data-topic');
                showTemporaryMessage(`Você clicou em "${topic}".`);
            });
        }
    });

    // Lida com o botão "Sair da Conta"
    logoutButton.addEventListener('click', () => {
        showTemporaryMessage('Você clicou em Sair da Conta.');
    });

    // Lógica de avaliação com estrelas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            showTemporaryMessage(`Você deu ${rating} estrela(s)!`);
            ratingMessage.textContent = `Obrigado por sua avaliação de ${rating} estrela(s)!`;

            // Remove a classe "selected" de todas as estrelas
            stars.forEach(s => s.classList.remove('selected'));

            // Adiciona a classe "selected" às estrelas clicadas e anteriores
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });
});