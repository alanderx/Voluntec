<?php
session_start();
include_once '../../app/conexao.php';

// Permite visualização pública de projetos por id
$id_projeto = $_GET['id'] ?? null;
if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID do projeto não informado.']);
    exit;
}

$sql = "SELECT p.project_id, p.project_name, p.project_description, p.created_at, u.full_name, p.created_by FROM projects p LEFT JOIN users u ON p.created_by = u.user_id WHERE p.project_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_projeto);
$stmt->execute();
$result = $stmt->get_result();
$projeto = $result->fetch_assoc();
$stmt->close();
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projeto);
