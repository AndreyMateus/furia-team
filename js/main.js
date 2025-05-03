// Animação de troca de personagens ao clicar na imagem na seção equipe.
document.addEventListener("DOMContentLoaded", () => {
    const thumbs = document.querySelectorAll(".thumb");
    const mainImage = document.getElementById("mainPhoto");
    const description = document.getElementById("mainDescription");
    const title = document.getElementById("title");

    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const newPhoto = thumb.getAttribute("src"); // Pega a imagem da miniatura
            const newDesc = thumb.getAttribute("data-desc");
            const newTitle = thumb.getAttribute("data-title");

            // Atualiza a imagem e a descrição principal
            mainImage.src = newPhoto;
            description.textContent = newDesc;
            title.textContent = newTitle;
        });
    });
});

// Efeito das letras na seção about.
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".container-section-about");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(aboutSection);
});


// CHATBOT
document.addEventListener('DOMContentLoaded', function () {
    const chatWidget = document.getElementById('chat-widget');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const playerCards = document.querySelectorAll('.player-card');

    // Estado do chat
    let isChatOpen = false;

    // Base de conhecimento
    const knowledgeBase = {
        jogadores: {
            kscerato: {
                nome: "Kaike 'KSCERATO' Cerato",
                descricao: "Um dos melhores riflers do mundo, conhecido por sua incrível consistência e clutches. Joga na FURIA desde 2018.",
                stats: "Rating: 1.15 | KAST: 74.5% | Headshots: 54%"
            },
            yuurih: {
                nome: "Yuri 'yuurih' Santos",
                descricao: "Jogador versátil que atua como suporte. Conhecido por seu jogo inteligente e adaptabilidade.",
                stats: "Rating: 1.10 | KAST: 72.3% | ADR: 80.5"
            },
            art: {
                nome: "Andrei 'arT' Piovezan",
                descricao: "Capitão e IGL da FURIA. Conhecido por seu estilo agressivo e inovador que revolucionou o jogo da equipe.",
                stats: "Rating: 0.98 | KAST: 68.2% | ADR: 85.7"
            },
            chelo: {
                nome: "Marcelo 'chelo' Cespedes",
                descricao: "Rifler experiente que se juntou à FURIA para fortalecer o elenco. Conhecido por seu jogo sólido e consistente.",
                stats: "Rating: 1.05 | KAST: 71.8% | Headshots: 48%"
            },
            saffee: {
                nome: "Rafael 'saffee' Costa",
                descricao: "AWPer principal da equipe. Conhecido por suas jogadas agressivas e tiros precisos com a AWP.",
                stats: "Rating: 1.08 | KAST: 70.5% | AWP Kills: 0.42 per round"
            }
        },
        jogos: [
            "FURIA vs NAVI - 27/04/2025 - IEM Rio",
            "FURIA vs Vitality - 30/04/2025 - ESL Pro League",
            "FURIA vs FaZe - 05/05/2025 - BLAST Premier"
        ],
        titulos: [
            "1º lugar - BLAST Premier Spring Finals 2023",
            "1º lugar - ESL Pro League Season 15",
            "1º lugar - IEM Rio 2024",
            "2º lugar - PGL Major Antwerp 2022"
        ]
    };

    // Alternar visibilidade do chat
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatContainer.classList.add('open');
            userInput.focus();
        } else {
            chatContainer.classList.remove('open');
        }
    }

    // Adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        messageDiv.innerHTML = text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();

        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll para baixo
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mostrar indicador de digitação
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remover indicador de digitação
    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Obter hora atual formatada
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    // Processar entrada do usuário
    function processUserInput(input) {
        const lowerInput = input.toLowerCase();

        // Mostrar que o bot está digitando
        showTyping();

        // Simular tempo de resposta
        setTimeout(() => {
            hideTyping();

            if (lowerInput.includes('jogador') || lowerInput.includes('player') || lowerInput.includes('time') || lowerInput.includes('equipe')) {
                const players = Object.values(knowledgeBase.jogadores).map(p => p.nome);
                addMessage(`O time atual da FURIA é composto por: ${players.join(', ')}. 🔥`, 'bot');
            }
            else if (lowerInput.includes('kscerato')) {
                const p = knowledgeBase.jogadores.kscerato;
                addMessage(`<strong>${p.nome}</strong><br>${p.descricao}<br><br><strong>Estatísticas:</strong> ${p.stats}`, 'bot');
            }
            else if (lowerInput.includes('yuurih')) {
                const p = knowledgeBase.jogadores.yuurih;
                addMessage(`<strong>${p.nome}</strong><br>${p.descricao}<br><br><strong>Estatísticas:</strong> ${p.stats}`, 'bot');
            }
            else if (lowerInput.includes('art') || lowerInput.includes('andrei')) {
                const p = knowledgeBase.jogadores.art;
                addMessage(`<strong>${p.nome}</strong><br>${p.descricao}<br><br><strong>Estatísticas:</strong> ${p.stats}`, 'bot');
            }
            else if (lowerInput.includes('chelo')) {
                const p = knowledgeBase.jogadores.chelo;
                addMessage(`<strong>${p.nome}</strong><br>${p.descricao}<br><br><strong>Estatísticas:</strong> ${p.stats}`, 'bot');
            }
            else if (lowerInput.includes('saffee')) {
                const p = knowledgeBase.jogadores.saffee;
                addMessage(`<strong>${p.nome}</strong><br>${p.descricao}<br><br><strong>Estatísticas:</strong> ${p.stats}`, 'bot');
            }
            else if (lowerInput.includes('próximo') || lowerInput.includes('proximo') || lowerInput.includes('jogo') || lowerInput.includes('partida')) {
                addMessage(`<strong>Próximos jogos da FURIA:</strong><br>- ${knowledgeBase.jogos.join('<br>- ')}`, 'bot');
            }
            else if (lowerInput.includes('titulo') || lowerInput.includes('troféu') || lowerInput.includes('trofeu') || lowerInput.includes('campeonato')) {
                addMessage(`<strong>Títulos conquistados pela FURIA:</strong><br>- ${knowledgeBase.titulos.join('<br>- ')}`, 'bot');
            }
            else if (lowerInput.includes('oi') || lowerInput.includes('olá') || lowerInput.includes('ola') || lowerInput.includes('eae')) {
                addMessage('Eae, fã da FURIA! 🔥 No que posso te ajudar hoje?', 'bot');
            }
            else if (lowerInput.includes('obrigado') || lowerInput.includes('obg') || lowerInput.includes('vlw')) {
                addMessage('De nada! Sempre à disposição para falar sobre a FURIA! #DIADEFURIA', 'bot');
            }
            else if (lowerInput.includes('tchau') || lowerInput.includes('adeus') || lowerInput.includes('até mais') || lowerInput.includes('ate mais')) {
                addMessage('Até mais! Quando quiser falar sobre a FURIA, estarei aqui! 🔥', 'bot');
            }
            else {
                addMessage('Não entendi sua pergunta. Você pode perguntar sobre jogadores, próximos jogos ou títulos. Ou clique em um dos jogadores abaixo!', 'bot');
            }
        }, 1000 + Math.random() * 2000); // Tempo aleatório entre 1-3s
    }

    // Enviar mensagem
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            processUserInput(message);
        }
    }

    // Event listeners
    chatWidget.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Eventos para os cards de jogadores
    playerCards.forEach(card => {
        card.addEventListener('click', () => {
            const player = card.getAttribute('data-player');
            addMessage(`Me fale sobre ${player}`, 'user');
            processUserInput(player);
        });
    });
});


// ARROW UP
(() => {
    const arrow = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const halfPage = document.body.scrollHeight / 2;

        if (scrollPosition > halfPage) {
            arrow.classList.add('show');
        } else {
            arrow.classList.remove('show');
        }
    });

    arrow.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();


// Animação menu mobile
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const containerHeader = document.querySelector('.container-header-mobile');

menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    containerHeader.classList.toggle('menu-open-mobile');
});

overlay.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    containerHeader.classList.remove('menu-open-mobile');
});

// Fechar o menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu-mobile a');
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        containerHeader.classList.remove('menu-open-mobile');
    });
});