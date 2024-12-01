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

$query = "SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS date, COUNT(DISTINCT customer_id) AS visitor_count FROM orders GROUP BY date";

$result = $conn->query($query);

if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['visitors' => $data]);

$result->free();
$conn->close();
?>
