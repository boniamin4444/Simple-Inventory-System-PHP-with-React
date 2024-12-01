<?php
// get_customers.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
include('config.php');

// Fetch all customers
$result = $conn->query("SELECT * FROM customers");
if ($result) {
    $customers = [];
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode(["success" => true, "data" => $customers]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to fetch customers"]);
}

$conn->close();
?>
