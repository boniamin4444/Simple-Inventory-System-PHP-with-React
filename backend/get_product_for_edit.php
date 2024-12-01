<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php'; // Ensure your database connection settings are included

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) {
        $query = "SELECT * FROM products WHERE id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                echo json_encode(["success" => true, "product" => $product]);
            } else {
                echo json_encode(["success" => false, "message" => "Product not found"]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Database query error"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid product ID"]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
