<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}

$id_usuario = $_SESSION['user_id'];
$id_projeto = $_GET['id_projeto'] ?? null;
if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'ID do projeto não informado.']);
    exit;
}

$sql = "SELECT tu.id, tu.task_id, tu.user_id, tu.project_id, tu.start_date, tu.end_date, tu.status, t.title
        FROM task_user tu
        JOIN task t ON tu.task_id = t.id
        WHERE tu.user_id = ? AND tu.project_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_usuario, $id_projeto);
$stmt->execute();
$result = $stmt->get_result();
$atividades = [];
while ($row = $result->fetch_assoc()) {
    $atividades[] = $row;
}
$stmt->close();
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($atividades);
