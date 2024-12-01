<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');
include('config.php');

$data = json_decode(file_get_contents("php://input"), true); // Get JSON data from request body

$id = $data['id'];
$name = $data['name'];
$description = $data['description'];

$sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $name, $description, $id);

if ($stmt->execute()) {
    $response = array('success' => true);
} else {
    $response = array('success' => false, 'message' => 'Error: ' . $stmt->error);
}

$stmt->close();
$conn->close(); 

echo json_encode($response);
?>
