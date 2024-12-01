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

$query = "
    SELECT p.id, p.product_name, c.name as category_name, p.price, p.stock_amount
    FROM products p
    JOIN categories c ON p.category_id = c.id
";

$result = $conn->query($query);

if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

$inventory = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['inventory' => $inventory]);

$result->free();
$conn->close();
?>
