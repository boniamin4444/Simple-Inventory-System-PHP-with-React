<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php'; // Ensure your database connection settings are included

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM categories";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode(["success" => true, "categories" => $categories]);
    } else {
        echo json_encode(["success" => false, "message" => "No categories found"]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
