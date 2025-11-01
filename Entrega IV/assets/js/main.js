// main.js - ponto de entrada da aplicação
import { initRouter, navigateTo } from './router.js';
import { initUI } from './ui-helpers.js';
import { handleFormInit } from './validation.js';
import { renderProjectsFromData } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();             // ativa menu e comportamento do site
  initRouter();         // ativa sistema SPA (Single Page)
  handleFormInit();     // validação de formulários
  renderProjectsFromData(); // renderiza projetos se houver container
});

export { navigateTo };
