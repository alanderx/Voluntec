<?php
include '../connection.php'; 

header("Content-Type: application/json; charset=utf-8");
session_start();

$nome = $_POST['name'];
$email = $_POST['email'];
$senha = $_POST['password'];
$data_nasc = $_POST['birth_date'];
$cidade = $_POST['city'];
$uf = $_POST['state'];
$pais = $_POST['country'];

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO user (name, email, password_hash, birth_date, city, state, country, is_moderator) VALUES (?, ?, ?, ?, ?, ?, ?, 0)");
$stmt->bind_param("sssssss", $nome, $email, $senha_hash, $data_nasc, $cidade, $uf, $pais);

$resposta = [];
if ($stmt->execute()) {
    $resposta['msg'] = "Usuário cadastrado com sucesso!";
    $resposta['codigo'] = true;
    $resposta['id'] = $conn->insert_id; // Return the new user ID for skills assignment
} else {
    $resposta['msg'] = "Erro ao cadastrar usuário: " . $stmt->error;
    $resposta['codigo'] = false;
}

$stmt->close();

echo json_encode($resposta);
?>