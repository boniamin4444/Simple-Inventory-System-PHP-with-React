<?php
header("Access-Control-Allow-Origin: *"); // For development only
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Include the database connection file
include '../config.php';

// SQL query to select all products
$query = "SELECT * FROM products";

// Execute the query
$result = $conn->query($query);

// Check if the query was successful
if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch all rows as an associative array
$products = $result->fetch_all(MYSQLI_ASSOC);

// Output the results as JSON
echo json_encode($products);

// Free result set and close the connection
$result->free();
$conn->close();
?>
