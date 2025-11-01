// router.js - controla o carregamento SPA
export function initRouter() {
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    navigateTo(href);
  });

  window.addEventListener('popstate', () => {
    loadContent(location.pathname.split('/').pop() || 'index.html', false);
  });

  loadContent(location.pathname.split('/').pop() || 'index.html', false);
}

export function navigateTo(href) {
  history.pushState({}, '', href);
  loadContent(href, true);
}

async function loadContent(href, scrollTop = true) {
  const main = document.querySelector('main');
  if (!main) return;

  let page = href.split('/').pop() || 'index.html';
  try {
    const res = await fetch(page, { cache: 'no-store' });
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const newMain = temp.querySelector('main');
    main.replaceWith(newMain.cloneNode(true));

    document.dispatchEvent(new CustomEvent('spa:contentLoaded', { detail: { page } }));
    if (scrollTop) window.scrollTo(0, 0);
  } catch (err) {
    main.innerHTML = `<h2>Erro ao carregar: ${err.message}</h2>`;
  }
}
