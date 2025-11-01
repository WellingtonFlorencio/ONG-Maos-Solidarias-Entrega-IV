// ui-helpers.js - controle de menu e modais
export function initUI() {
  const menuBtn = document.getElementById('menu-hamburguer');
  const nav = document.getElementById('nav-menu');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('ativo');
      menuBtn.classList.toggle('ativo');
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('ativo');
      menuBtn.classList.remove('ativo');
    }));
  }

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('ativo');
      menuBtn.classList.remove('ativo');
    }
  });
}
// === ACESSIBILIDADE: NAVEGAÇÃO POR TECLADO ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('usuario-teclado');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('usuario-teclado');
});
// === MODO ALTO CONTRASTE ===
const btnContraste = document.getElementById('toggle-contrast');
if (btnContraste) {
  btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    localStorage.setItem('modo-contraste', document.body.classList.contains('alto-contraste'));
  });

  if (localStorage.getItem('modo-contraste') === 'true') {
    document.body.classList.add('alto-contraste');
  }
}
