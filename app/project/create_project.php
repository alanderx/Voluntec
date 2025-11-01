<?php
session_start();
include_once '../conexao.php';

$resposta = [];

if (!isset($_SESSION['user_id'])) {
    $resposta['codigo'] = false;
    $resposta['msg'] = 'Usuário não logado.';
    echo json_encode($resposta);
    exit;
}

$nome = $_POST['project_name'] ?? '';
$descricao = $_POST['project_description'] ?? '';

if (empty($nome) || empty($descricao)) {
    $resposta['codigo'] = false;
    $resposta['msg'] = 'Preencha todos os campos.';
    echo json_encode($resposta);
    exit;
}

$id_usuario = $_SESSION['user_id'];
$data_criacao = date("Y-m-d H:i:s");

$sql = "INSERT INTO projects (project_name, project_description, created_at, created_by) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nome, $descricao, $data_criacao, $id_usuario);

if ($stmt->execute()) {
    $resposta['codigo'] = true;
    $resposta['msg'] = 'Projeto criado com sucesso.';
} else {
    $resposta['codigo'] = false;
    $resposta['msg'] = 'Erro ao criar projeto.';
}

$stmt->close();
$conn->close();
echo json_encode($resposta);
?>
