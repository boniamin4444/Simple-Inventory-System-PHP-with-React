<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

// SQL query to select orders with customer names, order dates, total amounts, and statuses
$query = "
    SELECT o.id AS order_id, c.full_name AS customer_name, o.order_date, o.status, c.total_amount
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
";

// Execute the query
$result = $conn->query($query);

if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch all rows as an associative array
$orders = $result->fetch_all(MYSQLI_ASSOC);

// Output the results as JSON
echo json_encode($orders);

// Free result set and close the connection
$result->free();
$conn->close();
?>
