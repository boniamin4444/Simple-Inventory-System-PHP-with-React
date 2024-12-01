<?php
header("Access-Control-Allow-Origin: *"); // For development only
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Include the database connection file
include '../config.php';

// Query to select all customers
$query = "SELECT * FROM customers";
$result = $conn->query($query);

// Check if the query was successful
if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch all rows as an associative array
$customers = $result->fetch_all(MYSQLI_ASSOC);

// Output the results as JSON
echo json_encode($customers);

// Free result set and close the connection
$result->free();
$conn->close();
?>
