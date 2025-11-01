document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("meusProjetos");
  try {
    const resp = await fetch("../app/project/my_projects.php");
    if (resp.status === 401) {
      container.innerHTML = '<div class="alert alert-danger">Você precisa estar logado para ver seus projetos.</div>';
      return;
    }
    const projetos = await resp.json();
    if (projetos.length === 0) {
      container.innerHTML = '<div class="alert alert-info">Você ainda não criou nenhum projeto.</div>';
      return;
    }
    let html = '<div class="row row-cols-1 row-cols-md-3 g-4">';
    projetos.forEach(p => {
      html += `
        <div class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.description}</p>
              <div class="d-flex gap-2 mt-3">
                <a href="update-&-delete_project.html?id=${p.id}" class="btn btn-warning btn-sm">Configurar Projeto</a>
                <a href="project.html?id=${p.id}" class="btn btn-primary btn-sm">Entrar</a>
              </div>
            </div>
            <div class="card-footer text-muted small">
              Criado em: ${new Date(p.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<div class="alert alert-danger">Erro ao carregar seus projetos.</div>';
  }
});


