<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}


$id = $_POST['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'Dados insuficientes para deletar.']);
    exit;
}

$sql = "DELETE FROM task_user WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
if ($stmt->execute()) {
    echo json_encode(['codigo' => true, 'msg' => 'Associação removida com sucesso.']);
} else {
    echo json_encode(['codigo' => false, 'msg' => 'Erro ao remover associação: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
