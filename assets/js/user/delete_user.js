document.getElementById("btnExcluirConta").addEventListener("click", async () => {
  const confirmacao = confirm("Are you sure you want to delete your account? All your projects will also be deleted. This action is irreversible.");
  if (!confirmacao) return;

  const resposta = await fetch("../../app/user/delete_user.php", {
    method: "POST"
  });

  const dados = await resposta.json();

  if (dados.codigo) {
    alert("Account deleted successfully.");
    window.location.href = "../../login/index.html";
  } else {
    alert("Error deleting account: " + dados.msg);
  }
});

