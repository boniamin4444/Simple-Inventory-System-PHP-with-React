<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Include database configuration
include '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT MONTH(order_date) AS month, SUM(quantity * price) AS total_sales FROM order_details od JOIN products p ON od.product_id = p.id GROUP BY month";

$result = $conn->query($query);

if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['sales' => $data]);

$result->free();
$conn->close();
?>
