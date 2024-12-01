<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Database connection parameters
include('config.php');
// Insert category
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';

    if ($name) {
        $stmt = $conn->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $description);

        if ($stmt->execute()) {
            $stmt->close();
            // Fetch category count
            $count_result = $conn->query("SELECT COUNT(*) as category_count FROM categories");
            $count_row = $count_result->fetch_assoc();
            echo json_encode(["success" => true, "count" => $count_row['category_count']]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to insert category"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Category name is required"]);
    }
}

$conn->close();
?>
