<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}

$id_usuario = $_SESSION['user_id'];
$sql = "SELECT id, name, description, created_at FROM project WHERE created_by = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();
$projetos = [];
while ($row = $result->fetch_assoc()) {
    $projetos[] = $row;
}
$stmt->close();
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projetos);
