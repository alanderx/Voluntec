document.getElementById("btnSalvarProjeto").addEventListener("click", async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const fd = new FormData();
  fd.append("id", id);
  fd.append("name", document.getElementById("name").value);
  fd.append("description", document.getElementById("description").value);

  const resp = await fetch('../../app/project/update_project.php', {
    method: 'POST',
    body: fd
  });

  const dados = await resp.json();

  let msg = "";
  if (dados.codigo) {
    msg = `<div class='alert alert-success'>${dados.msg}</div>`;
  } else {
    msg = `<div class='alert alert-danger'>${dados.msg}</div>`;
  }
  document.getElementById("alerta").innerHTML = msg;
});

