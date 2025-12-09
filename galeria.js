document.addEventListener('DOMContentLoaded', () => {

    // =================================
    // 1. CAROUSEL
    // =================================

    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    window.moveSlide = (direction) => {
        currentIndex += direction;

        if (currentIndex >= totalItems) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        }

        const offset = -currentIndex * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
    };

    setInterval(() => {
        moveSlide(1);
    }, 5000);


    // =================================
    // 2. GALERIA / MODAL
    // =================================

    const modal = document.getElementById('modal');
    const galleryItems = document.querySelectorAll('.art-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('modalImg').src = item.querySelector('img').src;
            document.getElementById('modalTitle').textContent = item.dataset.title;
            document.getElementById('modalArtist').textContent = `Por ${item.dataset.artist}, Nível de Ensino Simulado`;
            document.getElementById('modalCategory').textContent = `Categoria: ${item.dataset.category.charAt(0).toUpperCase() + item.dataset.category.slice(1)}`;
            modal.style.display = 'flex';
        });
    });

    window.closeModal = () => {
        modal.style.display = 'none';
    };

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // =================================
    // 3. NAVEGAÇÃO / ROTAS SIMULADAS
    // =================================

    const currentContent = document.querySelector('.container');
    const carouselSection = document.querySelector('.carousel');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    function showSection(sectionId) {
        navLinks.forEach(link => link.classList.remove('current'));

        if (currentContent) currentContent.style.display = 'none';
        if (carouselSection) carouselSection.style.display = 'none';
        
        const dynamicContent = document.getElementById('dynamic-content');
        if (dynamicContent) dynamicContent.remove();
        
        const newContent = document.createElement('div');
        newContent.id = 'dynamic-content';
        newContent.classList.add('container');
        header.after(newContent);

        if (sectionId === 'galeria') {
            document.querySelector('.nav-link:nth-child(1)').classList.add('current');
            if (currentContent) currentContent.style.display = 'block';
            if (carouselSection) carouselSection.style.display = 'block';
            newContent.remove();
        } else if (sectionId === 'comunidades') {
            document.querySelector('.nav-link:nth-child(2)').classList.add('current');
            newContent.innerHTML = createCommunitiesContent();
        } else if (sectionId === 'caixa-entrada') {
            document.querySelector('.nav-link:nth-child(3)').classList.add('current');
            newContent.innerHTML = createInboxContent();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = e.target.textContent.toLowerCase();
            if (text.includes('galeria')) {
                showSection('galeria');
            } else if (text.includes('comunidades')) {
                showSection('comunidades');
            } else if (text.includes('caixa de entrada')) {
                showSection('caixa-entrada');
            }
        });
    });
    
    showSection('galeria'); 

    // Conteúdo Dinâmico (Comunidades)
    function createCommunitiesContent() {
        return `
            <style>
                #dynamic-content h2 { color: rgb(117, 83, 211); margin-top: 0; }
                .community-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .community-item { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; }
                .community-item:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
                .community-item h3 { margin-top: 0; color: #333; font-size: 20px;}
                .community-item p { color: #666; font-size: 14px; }
                .community-stats { display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px; color: rgb(117, 83, 211); font-weight: bold;}
            </style>
            <h2>Comunidades de Arte Populares (r/VitrineLivre)</h2>
            <p>Explore e participe de grupos focados em diferentes formas de arte.</p>
            <div class="community-list">
                <div class="community-item">
                    <h3>r/DesenhoDiario</h3>
                    <p>Comunidade para quem desenha todos os dias. Desafios e feedback construtivo.</p>
                    <div class="community-stats"><span><i class="fas fa-users"></i> 15.2k Membros</span><span><i class="fas fa-chart-line"></i> 500 Online</span></div>
                </div>
                <div class="community-item">
                    <h3>r/PinturaOleo</h3>
                    <p>Dicas, tutoriais e exposições de obras em tinta a óleo.</p>
                    <div class="community-stats"><span><i class="fas fa-users"></i> 8.9k Membros</span><span><i class="fas fa-chart-line"></i> 210 Online</span></div>
                </div>
                <div class="community-item">
                    <h3>r/FotografiaDeRua</h3>
                    <p>Para entusiastas e profissionais da fotografia urbana e documental.</p>
                    <div class="community-stats"><span><i class="fas fa-users"></i> 22k Membros</span><span><i class="fas fa-chart-line"></i> 950 Online</span></div>
                </div>
                <div class="community-item">
                    <h3>r/ArtePixel</h3>
                    <p>Discussão sobre a arte digital baseada em pixels e jogos retrô.</p>
                    <div class="community-stats"><span><i class="fas fa-users"></i> 6.1k Membros</span><span><i class="fas fa-chart-line"></i> 150 Online</span></div>
                </div>
            </div>
        `;
    }

    // Conteúdo Dinâmico (Caixa de Entrada/Notificações)
    const notifications = [
        { type: 'comment', user: 'MariaOliveira', target: 'seu post "Abstrato Azul"', time: '1h atrás' },
        { type: 'post', user: 'CarlosSantos', target: 'Natureza Selvagem', time: '3h atrás' },
        { type: 'follow', user: 'PedroFerreira', target: 'você', time: '5h atrás' },
        { type: 'upvote', user: 'LuanaCosta', target: 'seu post "Cidade Futurista"', time: '1d atrás' },
        { type: 'post', user: 'RafaelGomes', target: 'Arquitetura Urbana', time: '1d atrás' },
        { type: 'comment', user: 'BeatrizRocha', target: 'seu post "Instalação Interativa"', time: '2d atrás' },
    ];
    
    function getNotificationMessage(notif) {
        switch(notif.type) {
            case 'comment':
                return `<strong>${notif.user}</strong> comentou no ${notif.target}: "Que cores incríveis! Parabéns..."`;
            case 'post':
                return `<strong>${notif.user}</strong> postou: "${notif.target}" na comunidade r/VitrineLivre.`;
            case 'follow':
                return `<strong>${notif.user}</strong> começou a seguir ${notif.target}.`;
            case 'upvote':
                return `Você recebeu um "Gostei" de <strong>${notif.user}</strong> no ${notif.target}.`;
            default:
                return `Nova atividade de <strong>${notif.user}</strong>.`;
        }
    }

    function createInboxContent() {
        let notifHtml = notifications.map(notif => `
            <div class="notification-item notification-${notif.type}">
                <div class="notification-icon">
                    <i class="fas ${notif.type === 'comment' ? 'fa-comment' : notif.type === 'post' ? 'fa-image' : notif.type === 'follow' ? 'fa-user-plus' : 'fa-heart'}"></i>
                </div>
                <div class="notification-body">
                    <p>${getNotificationMessage(notif)}</p>
                    <span class="notification-time">${notif.time}</span>
                </div>
            </div>
        `).join('');

        return `
            <style>
                #dynamic-content h2 { color: rgb(117, 83, 211); margin-top: 0; }
                .inbox-list { max-width: 800px; margin: 0 auto; }
                .notification-item { display: flex; align-items: center; background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); border-left: 5px solid rgb(117, 83, 211); transition: background 0.2s; cursor: pointer; }
                .notification-item:hover { background: #f9f9f9; }
                .notification-icon { font-size: 20px; color: rgb(117, 83, 211); margin-right: 15px; }
                .notification-body p { margin: 0; font-size: 14px; line-height: 1.4; }
                .notification-time { display: block; font-size: 12px; color: #aaa; margin-top: 5px; }
            </style>
            <h2>Caixa de Entrada (Notificações)</h2>
            <p>Seus posts, comentários e interações recentes.</p>
            <div class="inbox-list">
                ${notifHtml}
            </div>
        `;
    }

    // =================================
    // 4. PERFIL (LOGIN ILUSTRATIVO)
    // =================================

    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique se propague para o document
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Fecha o dropdown se clicar fora dele
    document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.style.display = 'none';
        }
    });

    // Impede o fechamento ao clicar dentro do dropdown
    profileDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Simula a ação do botão de Login (Apenas ilustrativo)
    const loginBtn = profileDropdown.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        alert("Funcionalidade de Login não implementada. Apenas ilustração!");
        profileDropdown.style.display = 'none';
    });

    // =================================
    // 5. CHAT (DRAG AND DROP) - Direct Estilo Instagram
    // =================================

    const messageIcon = document.getElementById('messageIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChat');
    const chatList = document.getElementById('chatList');
    const chatHeader = document.querySelector('.chat-header');
    
    // Simula algumas conversas (Direct)
    const directMessages = [
        { user: 'João Silva', msg: 'Vi sua nova pintura, muito boa!', time: '1m' },
        { user: 'Equipe Admin', msg: 'Sua arte foi destacada na galeria!', time: '3h' },
        { user: 'Luana Costa', msg: 'Quer colaborar em um projeto digital?', time: '1d' },
        { user: 'Rafael Gomes', msg: 'Ainda não li...', time: '2d' },
    ];

    function createChatList() {
        chatList.innerHTML = directMessages.map(dm => `
            <div class="chat-item">
                <div class="chat-avatar">${dm.user.charAt(0)}</div>
                <div class="chat-info">
                    <h5>${dm.user}</h5>
                    <p>${dm.msg} &bull; ${dm.time}</p>
                </div>
            </div>
        `).join('');
    }

    // Abre a janela de chat e carrega a lista
    messageIcon.addEventListener('click', () => {
        if (chatWindow.style.display === 'block') {
            chatWindow.style.display = 'none';
        } else {
            createChatList();
            chatWindow.style.display = 'block';
            chatWindow.style.opacity = '1';
        }
    });

    // Fecha a janela de chat
    closeChatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Lógica para Arrastar (Drag-and-Drop)
    let isDragging = false;
    let offsetX, offsetY;

    chatHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        chatWindow.classList.add('dragging');
        // Calcula o offset entre o ponteiro e o canto superior esquerdo da janela
        offsetX = e.clientX - chatWindow.offsetLeft;
        offsetY = e.clientY - chatWindow.offsetTop;
        // Previne seleção de texto
        e.preventDefault(); 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Limita o movimento dentro dos limites da viewport
        const maxX = window.innerWidth - chatWindow.offsetWidth;
        const maxY = window.innerHeight - chatWindow.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        chatWindow.style.left = newX + 'px';
        chatWindow.style.top = newY + 'px';
        chatWindow.style.right = 'unset'; // Desativa o right/bottom fixo ao arrastar
        chatWindow.style.bottom = 'unset';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        chatWindow.classList.remove('dragging');
    });
});
// O Evento para abrir o modal ao clicar em uma obra (Antiga implementação)
/*
if (gallery) {
    gallery.addEventListener('click', (event) => {
        const item = event.target.closest('.art-item');
        if (item) { // Isto estava causando o bug
            // ... código do modal ...
        }
    });
}
*/

// O Evento para abrir o modal ao clicar em uma obra (NOVA IMPLEMENTAÇÃO)
if (gallery) {
    gallery.addEventListener('click', (event) => {
        const item = event.target.closest('.art-item');
        
        // 🚨 CORREÇÃO CRÍTICA: Se o clique foi dentro da div 'art-actions', pare a execução.
        if (event.target.closest('.art-actions')) {
            // O clique será tratado pelas funções específicas de like/comment.
            return; 
        }

        // Se chegamos aqui, o clique foi no corpo da imagem ou info, então abre o modal.
        if (item) {
            const img = item.querySelector('img');
            const title = item.querySelector('.art-info h3').textContent;
            const artistText = item.querySelector('.art-info p:first-of-type').textContent;
            const categoryText = item.querySelector('.art-info p:last-of-type').textContent;
            openModal(img.src, title, artistText, categoryText);
        }
    });
}

// **Mantenha o restante do seu código JavaScript (Funções moveSlide, drag, like-button, etc.) inalterado.**

// Obter referências para o novo modal
const profileLink = document.getElementById('profileLink');
const myProfileModal = document.getElementById('myProfileModal');
const editProfileBtn = document.getElementById('editProfileBtn');

// Função para abrir o modal do Meu Perfil
function openMyProfileModal() {
    myProfileModal.style.display = 'flex';
}

// Função para fechar o modal do Meu Perfil
function closeMyProfileModal() {
    myProfileModal.style.display = 'none';
}

// Event Listeners
if (profileLink) {
    profileLink.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar
        openMyProfileModal();
    });
}

if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        // Lógica Fictícia para Edição
        alert("A função de edição de perfil está simulada. Você pode integrar um formulário aqui para capturar e salvar dados!");
    });
}

// Fechar modal ao clicar fora (ou usando o X)
window.addEventListener('click', (event) => {
    // ... (Mantenha a lógica do Modal de Imagem existente) ...

    if (event.target === myProfileModal) {
        closeMyProfileModal();
    }
});
// Referências para o novo modal
const postIcon = document.getElementById('postIcon');
const postModal = document.getElementById('postModal');

// Função para abrir o modal de postagem
function openPostModal() {
    postModal.style.display = 'flex';
}

// Função para fechar o modal de postagem
function closePostModal() {
    postModal.style.display = 'none';
    // Opcional: Limpar o formulário ao fechar
    document.getElementById('postPhoto').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postDescription').value = '';
    document.getElementById('postCategory').value = ''; 
}

// Função de simulação de postagem
function submitPost() {
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;

    if (!title || !category) {
        alert("Por favor, preencha o Título e selecione a Categoria.");
        return;
    }

    // Simulação de envio
    alert(`🎉 Postagem de "${title}" (Categoria: ${category}) enviada com sucesso! (Simulação)\n\nNa implementação real, esta função enviaria os dados para um servidor.`);
    
    // Fecha o modal após o envio simulado
    closePostModal();
}


// Event Listeners (Adicione junto aos outros listeners no seu galeria.js)
if (postIcon) {
    postIcon.addEventListener('click', () => {
        openPostModal();
    });
}

// Fechar o modal de postagem ao clicar fora
window.addEventListener('click', (event) => {
    // ... (Mantenha as lógicas existentes para modal e myProfileModal) ...
    
    if (event.target === postModal) {
        closePostModal();
    }
});
// Obter referências para o novo modal de Ajuda
const helpLink = document.getElementById('helpLink');
const helpModal = document.getElementById('helpModal');

// Função para abrir o modal de Ajuda
function openHelpModal() {
    helpModal.style.display = 'flex';
}

// Função para fechar o modal de Ajuda
function closeHelpModal() {
    helpModal.style.display = 'none';
}

// Event Listeners (Adicione junto aos outros listeners no seu galeria.js)
if (helpLink) {
    helpLink.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar
        openHelpModal();
    });
}

// Fechar modal ao clicar fora (Adicione esta verificação dentro do seu window.addEventListener('click'))
window.addEventListener('click', (event) => {
    // ... (Mantenha as lógicas existentes para modal, myProfileModal e postModal) ...

    if (event.target === helpModal) {
        closeHelpModal();
    }
});

// Certifique-se de que a função closeModal() original também exista
// if (document.getElementById('modal')) { ... }