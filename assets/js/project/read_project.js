document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const alerta = document.getElementById("alerta");
  if (!id) {
    alerta.innerHTML = '<div class="alert alert-danger">Projeto não encontrado.</div>';
    return;
  }
  try {
    const resp = await fetch(`../../app/project/read_project.php?id=${id}`);
    const projeto = await resp.json();
    if (!projeto) {
      alerta.innerHTML = '<div class="alert alert-danger">Projeto não encontrado.</div>';
      return;
    }
    document.getElementById("name").value = projeto.name;
    document.getElementById("description").value = projeto.description;
  } catch (e) {
    alerta.innerHTML = '<div class="alert alert-danger">Erro ao carregar projeto.</div>';
  }
});

