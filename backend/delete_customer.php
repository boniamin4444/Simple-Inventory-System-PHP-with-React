<?php
// delete_customer.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
include('config.php');

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Extract customer ID
$id = intval($data['id']);

// Prepare and bind
$stmt = $conn->prepare("DELETE FROM customers WHERE id = ?");
if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("i", $id);

// Execute
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Execution failed: " . $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
