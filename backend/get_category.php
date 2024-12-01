<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); // Ensure response type is JSON

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id']; // Retrieve category ID

    // Prepare SQL query to get category details
    $query = "SELECT * FROM categories WHERE id = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $category = $result->fetch_assoc();
            echo json_encode(["success" => true, "category" => $category]);
        } else {
            echo json_encode(["success" => false, "message" => "Category not found"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>
