<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}


$id = $_POST['id'] ?? null;
$id_tarefa = $_POST['task_id'] ?? null;
$data_comeco = $_POST['start_date'] ?? null;
$data_termino = $_POST['end_date'] ?? null;
$estado = $_POST['status'] ?? null;

if (!$id || !$id_tarefa || !$data_comeco || !$data_termino || !$estado) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'Preencha todos os campos obrigatórios.']);
    exit;
}

$sql = "UPDATE task_user SET task_id = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssi", $id_tarefa, $data_comeco, $data_termino, $estado, $id);
if ($stmt->execute()) {
    echo json_encode(['codigo' => true, 'msg' => 'Associação atualizada com sucesso.']);
} else {
    echo json_encode(['codigo' => false, 'msg' => 'Erro ao atualizar associação: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
