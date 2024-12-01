<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

include('config.php');


$id = $_GET['id'];

$sql = "DELETE FROM categories WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    $response = array('success' => true);
} else {
    $response = array('success' => false, 'message' => 'Error: ' . $stmt->error);
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
