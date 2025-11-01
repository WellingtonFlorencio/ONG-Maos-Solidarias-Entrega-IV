// O "DOMContentLoaded" garante que o HTML seja carregado antes de qualquer script rodar
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MODAL DE SUCESSO E CONFETES ---
    const form = document.getElementById('form-cadastro');
    const modalSucesso = document.getElementById('modal-sucesso');

    // O 'if (form)' garante que este código só tente rodar na página de cadastro
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            // Ativa os confetes
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });

            // Mostra o modal de sucesso
            if (modalSucesso) {
                modalSucesso.classList.add('ativo');
            }
        });
    }


    // --- NOVA LÓGICA DO MENU HAMBÚRGUER ---
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const navMenu = document.getElementById('nav-menu');

    // O 'if (menuHamburguer)' garante que este código exista em todas as páginas
    if (menuHamburguer && navMenu) {
        menuHamburguer.addEventListener('click', function() {
            // A função 'toggle' adiciona ou remove a classe 'ativo'. É o que faz a mágica!
            navMenu.classList.toggle('ativo');
            menuHamburguer.classList.toggle('ativo'); // Também anima o botão para virar um "X"
        });
    }

});