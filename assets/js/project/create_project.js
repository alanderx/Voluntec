document.getElementById("btnSalvarProjeto").addEventListener("click", async () => {
  const fd = new FormData();
  fd.append("name", document.getElementById("name").value);
  fd.append("description", document.getElementById("description").value);

  const resp = await fetch('../../app/project/create_project.php', {
    method: 'POST',
    body: fd
  });

  const dados = await resp.json();

  let msg = "";
  if (dados.codigo) {
    msg = `<div class='alert alert-success'>${dados.msg}</div>`;
    setTimeout(() => { window.location.href = 'meus_projetos.html'; }, 1200);
  } else {
    msg = `<div class='alert alert-danger'>${dados.msg}</div>`;
  }
  document.getElementById("alerta").innerHTML = msg;
});

