<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}

$id_usuario = $_SESSION['user_id'];
$id_projeto = $_POST['id'] ?? null;
if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID do projeto não informado.']);
    exit;
}

$nome = $_POST['name'] ?? '';
$desc = $_POST['description'] ?? '';

if (empty($nome) || empty($desc)) {
    echo json_encode(['codigo' => false, 'msg' => 'Preencha todos os campos.']);
    exit;
}

$sql = "UPDATE project SET name = ?, description = ? WHERE id = ? AND created_by = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssii", $nome, $desc, $id_projeto, $id_usuario);
if ($stmt->execute()) {
    echo json_encode(['codigo' => true, 'msg' => 'Projeto atualizado com sucesso.']);
} else {
    echo json_encode(['codigo' => false, 'msg' => 'Erro ao atualizar projeto: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
