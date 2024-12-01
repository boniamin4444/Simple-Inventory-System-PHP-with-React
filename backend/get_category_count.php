<?php
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Content-Type: application/json'); // Specify JSON content type

header('Content-Type: application/json');

include('config.php');

// SQL query to count the number of categories
$sql = "SELECT COUNT(*) as category_count FROM categories";
$result = $conn->query($sql);

$response = array("count" => 0);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response["count"] = $row['category_count'];
}

echo json_encode($response);

$conn->close();

?>
