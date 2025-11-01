<?php
session_start();
include_once '../../app/conexao.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}

$id_usuario = $_SESSION['user_id'];
$id_projeto = $_POST['project_id'] ?? null;
if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID do projeto não informado.']);
    exit;
}

$nome = $_POST['project_name'] ?? '';
$desc = $_POST['project_description'] ?? '';

if (empty($nome) || empty($desc)) {
    echo json_encode(['codigo' => false, 'msg' => 'Preencha todos os campos.']);
    exit;
}

$sql = "UPDATE projects SET project_name = ?, project_description = ? WHERE project_id = ? AND created_by = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssii", $nome, $desc, $id_projeto, $id_usuario);
if ($stmt->execute()) {
    echo json_encode(['codigo' => true, 'msg' => 'Projeto atualizado com sucesso.']);
} else {
    echo json_encode(['codigo' => false, 'msg' => 'Erro ao atualizar projeto: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
