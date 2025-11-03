<?php
session_start();
include_once '../../app/connection.php';

// Permite visualização pública de projetos por id
$id_projeto = $_GET['id'] ?? null;
if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID do projeto não informado.']);
    exit;
}

$sql = "SELECT p.id, p.name, p.description, p.created_at, u.name as full_name, p.created_by FROM project p LEFT JOIN volunteer u ON p.created_by = u.id WHERE p.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_projeto);
$stmt->execute();
$result = $stmt->get_result();
$projeto = $result->fetch_assoc();
$stmt->close();
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projeto);
