document.addEventListener("DOMContentLoaded", async () => {
  const resposta = await fetch('../../app/user/read_user.php');
  const dados = await resposta.json();

  if (dados.codigo) {
    const user = dados.usuario;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('city').value = user.city;
    document.getElementById('state').value = user.state;
    document.getElementById('country').value = user.country;
  } else {
    document.getElementById('alerta').innerHTML =
      `<div class="alert alert-danger">${dados.msg}</div>`;
  }
});

