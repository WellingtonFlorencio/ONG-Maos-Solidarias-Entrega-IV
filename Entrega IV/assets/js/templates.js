// templates.js - gera HTML dinâmico de projetos
export function projectCardTemplate({ title, tag, img, description }) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.innerHTML = `
    <h3>${title}</h3>
    <p class="tag">${tag}</p>
    <img src="${img}" alt="${title}">
    <p>${description}</p>
    <a href="#" class="button">Ver Detalhes</a>
  `;
  return article;
}

export function renderProjectsFromData(data) {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;
  const projects = data || [
    { title: 'Educação Verde', tag: 'Meio Ambiente', img: 'assets/img/projeto1.jpg', description: 'Ensina sustentabilidade a crianças.' },
    { title: 'Saúde Comunitária', tag: 'Saúde', img: 'assets/img/projeto2.jpg', description: 'Atendimentos e orientações gratuitas.' },
    { title: 'Inclusão Digital', tag: 'Tecnologia', img: 'assets/img/projeto3.jpg', description: 'Cursos de informática gratuitos.' }
  ];
  grid.innerHTML = '';
  projects.forEach(p => grid.appendChild(projectCardTemplate(p)));
}
