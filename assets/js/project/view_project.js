document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const card = document.getElementById("projetoCard");
  if (!id) {
    card.innerHTML = '<div class="alert alert-danger">Projeto não encontrado.</div>';
    return;
  }
  try {
    const resp = await fetch(`../app/project/read_project.php?id=${id}`);
    const projeto = await resp.json();
    if (!projeto) {
      card.innerHTML = '<div class="alert alert-danger">Projeto não encontrado.</div>';
      return;
    }
    let nomeUsuario = projeto.full_name ? projeto.full_name : 'Desconhecido';
    card.innerHTML = `
      <div class="mb-3 projeto-titulo">${projeto.name}</div>
      <div class="projeto-desc">${projeto.description}</div>
      <div class="projeto-meta">
        <span>Criado por: ${nomeUsuario}</span><br>
        Criado em: ${new Date(projeto.created_at).toLocaleDateString()}
      </div>
    `;
  } catch (e) {
    card.innerHTML = '<div class="alert alert-danger">Erro ao carregar projeto.</div>';
  }
});
