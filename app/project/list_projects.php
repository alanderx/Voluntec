<?php
include_once '../connection.php';

$sql = "SELECT p.id, p.name, p.description, p.created_at, u.name as full_name FROM project p JOIN volunteer u ON p.created_by = u.id ORDER BY p.created_at DESC LIMIT 12";
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
