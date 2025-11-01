<?php
include_once '../conexao.php';

$sql = "SELECT p.project_id, p.project_name, p.project_description, p.created_at, u.full_name FROM projects p JOIN users u ON p.created_by = u.user_id ORDER BY p.created_at DESC LIMIT 12";
$result = $conn->query($sql);
$projetos = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
    $projetos[] = $row;
    }
}
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projetos);
