<?php
header("Access-Control-Allow-Origin: *"); // For development only
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Include the database connection file
include '../config.php';

// Query to select all categories
$query = "SELECT * FROM categories";
$result = $conn->query($query);

// Check if the query was successful
if ($result === false) {
    // Output JSON with an error message if the query fails
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch all rows as an associative array
$categories = $result->fetch_all(MYSQLI_ASSOC);

// Output the results as JSON
echo json_encode($categories);

// Free the result set and close the connection
$result->free();
$conn->close();
?>
