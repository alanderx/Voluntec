<?php
session_start();
include_once '../../app/connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['codigo' => false, 'msg' => 'Usuário não logado.']);
    exit;
}


$id_usuario = $_SESSION['user_id'];
$id_projeto = $_POST['project_id'] ?? null;
$id_tarefa = $_POST['task_id'] ?? null;
$data_comeco = $_POST['start_date'] ?? null;
$data_termino = $_POST['end_date'] ?? null;
$estado = $_POST['status'] ?? 'A Fazer';

if (!$id_projeto || !$id_tarefa || !$data_comeco || !$data_termino) {
    http_response_code(400);
    echo json_encode(['codigo' => false, 'msg' => 'Preencha todos os campos obrigatórios.']);
    exit;
}

$sql = "INSERT INTO task_user (task_id, user_id, project_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiisss", $id_tarefa, $id_usuario, $id_projeto, $data_comeco, $data_termino, $estado);
if ($stmt->execute()) {
    echo json_encode(['codigo' => true, 'msg' => 'Associação criada com sucesso.']);
} else {
    echo json_encode(['codigo' => false, 'msg' => 'Erro ao criar associação: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
