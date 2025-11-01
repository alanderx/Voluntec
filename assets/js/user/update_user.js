document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnAtualizarConta").addEventListener('click', function () {
        updateProfile();
    });
});

async function updateProfile() {
    const fd = new FormData();
    fd.append('name', document.getElementById("name").value);
    fd.append('email', document.getElementById("email").value);
    fd.append('city', document.getElementById("city").value);
    fd.append('state', document.getElementById("state").value);
    fd.append('country', document.getElementById("country").value);

    const retorno = await fetch('../../app/user/update_user.php', {
        method: 'POST',
        body: fd
    });

    const resposta = await retorno.json();
    let msg = "";
    if (resposta.codigo) {
        msg = "<span class='alert alert-success d-block'>" + resposta.msg + "</span>";
    } else {
        msg = "<span class='alert alert-danger d-block'>" + resposta.msg + "</span>";
    }
    document.getElementById("alerta").innerHTML = msg;
}

