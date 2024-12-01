<?php
header("Access-Control-Allow-Origin: *"); // For development only
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Include the database connection file
include '../config.php';

// Check if $conn is set
if (!isset($conn) || !$conn instanceof mysqli) {
    echo json_encode(['error' => 'Database connection not established.']);
    exit;
}

// Query to select all colors
$query = "SELECT * FROM colors";
$result = $conn->query($query);

// Check if the query was successful
if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch all rows as an associative array
$colors = $result->fetch_all(MYSQLI_ASSOC);

// Output the results as JSON
echo json_encode($colors);

// Free result set and close the connection
$result->free();
$conn->close();
?>
