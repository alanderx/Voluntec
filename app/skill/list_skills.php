<?php
session_start();
include_once '../connection.php';

header("Content-Type: application/json; charset=utf-8");

$type = isset($_GET['type']) ? $_GET['type'] : null;

if ($type) {
    $stmt = $conn->prepare("SELECT id, name, type FROM skill WHERE type = ?");
    $stmt->bind_param("s", $type);
} else {
    $stmt = $conn->prepare("SELECT id, name, type FROM skill");
}

$stmt->execute();
$resultado = $stmt->get_result();

$skills = [];
while ($row = $resultado->fetch_assoc()) {
    $skills[] = $row;
}

echo json_encode(['codigo' => true, 'skills' => $skills]);

$stmt->close();
$conn->close();
?>
