<?php
// insert_customer.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
include('config.php');

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
$errors = [];

if (empty($data['full_name'])) {
    $errors[] = 'Full Name is required';
}
if (empty($data['number_of_orders']) || !is_numeric($data['number_of_orders']) || $data['number_of_orders'] < 0) {
    $errors[] = 'Valid Number Of Orders is required';
}
if (empty($data['total_amount']) || !is_numeric($data['total_amount']) || $data['total_amount'] < 0) {
    $errors[] = 'Valid Total Amount is required';
}
if (empty($data['mobile'])) {
    $errors[] = 'Mobile is required';
}

if (!empty($errors)) {
    echo json_encode(["success" => false, "message" => implode(', ', $errors)]);
    exit();
}

// Sanitize input
$full_name = $conn->real_escape_string(trim($data['full_name']));
$number_of_orders = (int) $data['number_of_orders'];
$total_amount = (float) $data['total_amount'];
$order_details = isset($data['order_details']) ? $conn->real_escape_string(trim($data['order_details'])) : '';
$mobile = $conn->real_escape_string(trim($data['mobile']));

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO customers (full_name, number_of_orders, total_amount, order_details, mobile) VALUES (?, ?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param("sidss", $full_name, $number_of_orders, $total_amount, $order_details, $mobile);

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
