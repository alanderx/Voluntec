<?php
session_start();
include_once '../connection.php';

$resposta = [];

if (!isset($_SESSION['user_id'])) {
    $resposta['codigo'] = false;
    $resposta['msg'] = 'Usuário não logado.';
    echo json_encode($resposta);
    exit;
}

$id = $_SESSION['user_id'];

$nome = $_POST['name'];
$email = $_POST['email'];
$cidade = $_POST['city'];
$uf = $_POST['state'];
$pais = $_POST['country'];

$sql = "UPDATE volunteer SET name = ?, email = ?, city = ?, state = ?, country = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $nome, $email, $cidade, $uf, $pais, $id);

if ($stmt->execute()) {
    $resposta['codigo'] = true;
    $resposta['msg'] = 'Conta atualizada com sucesso.';
} else {
    $resposta['codigo'] = false;
    $resposta['msg'] = 'Erro ao atualizar conta.';
}

$stmt->close();
$conn->close();
header("Content_type: application/json; charset: utf-8;");
echo json_encode($resposta);
?>
