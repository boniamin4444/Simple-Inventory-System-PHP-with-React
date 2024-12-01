<?php
// update_customer.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
include('config.php');

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Extract data
$id = intval($data['id']);
$full_name = $conn->real_escape_string($data['full_name']);
$number_of_orders = (int) $data['number_of_orders'];
$total_amount = (float) $data['total_amount'];
$order_details = $conn->real_escape_string($data['order_details']);
$mobile = $conn->real_escape_string($data['mobile']);

// Prepare and bind
$stmt = $conn->prepare("UPDATE customers SET full_name = ?, number_of_orders = ?, total_amount = ?, order_details = ?, mobile = ? WHERE id = ?");
if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("sidsi", $full_name, $number_of_orders, $total_amount, $order_details, $mobile, $id);

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
