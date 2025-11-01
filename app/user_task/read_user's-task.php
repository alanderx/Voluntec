<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID da associação não informado.']);
    exit;
}

$sql = "SELECT tu.id, tu.task_id, tu.user_id, tu.project_id, tu.start_date, tu.end_date, tu.status, t.title
        FROM task_user tu
        JOIN task t ON tu.task_id = t.id
        WHERE tu.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$atividade = $result->fetch_assoc();
$stmt->close();
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($atividade);
