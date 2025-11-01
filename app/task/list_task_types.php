<?php
include_once '../../app/connection.php';
$sql = "SELECT id, title FROM task ORDER BY title";
$result = $conn->query($sql);
$atividades = [];
while ($row = $result->fetch_assoc()) {
    $atividades[] = $row;
}
$conn->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($atividades);
