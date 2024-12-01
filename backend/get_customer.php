<?php
// get_customer.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
include('config.php');

// Get customer ID
$id = intval($_GET['id']);

// Fetch customer details
$stmt = $conn->prepare("SELECT * FROM customers WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $customer = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $customer]);
} else {
    echo json_encode(["success" => false, "message" => "Customer not found"]);
}

$stmt->close();
$conn->close();
?>
