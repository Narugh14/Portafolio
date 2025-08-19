const githubUser = 'Narugh14'; // Cambia a tu usuario GitHub
const projectsContainer = document.getElementById('github-projects');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let allProjects = [];
allProjects = repos
  .filter(r => r.description)
  .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0,6);

fetch(`https://api.github.com/users/${githubUser}/repos`)
  .then(res => res.json())
  .then(repos => {
    allProjects = repos.filter(r => r.description).slice(0, 8); // Solo los primeros 6
    displayProjects('all');
  })
  .catch(err => console.error(err));

function displayProjects(filter) {
  projectsContainer.innerHTML = '';
  allProjects.forEach(repo => {
    const tech = repo.language ? repo.language.toLowerCase() : 'other';
    if(filter === 'all' || filter === tech || (filter === 'web' && ['html','javascript','css'].includes(tech))) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description}</p>
        <p><strong>Tecnología:</strong> ${repo.language || 'No especificado'}</p>
      `;
      projectsContainer.appendChild(card);
    }
  });
}

// Filtros
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayProjects(btn.dataset.tech);
  });
});