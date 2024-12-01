<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php'; // Ensure your database connection settings are included

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($data['id']) ? intval($data['id']) : 0;
    $product_name = isset($data['product_name']) ? $data['product_name'] : '';
    $description = isset($data['description']) ? $data['description'] : '';
    $price = isset($data['price']) ? floatval($data['price']) : 0;
    $stock_amount = isset($data['stock_amount']) ? intval($data['stock_amount']) : 0;
    $status = isset($data['status']) ? $data['status'] : '';
    $category = isset($data['category']) ? intval($data['category']) : 0;

    if ($id > 0) {
        $query = "UPDATE products SET product_name = ?, description = ?, price = ?, stock_amount = ?, status = ?, category = ? WHERE id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("ssdiiis", $product_name, $description, $price, $stock_amount, $status, $category, $id);
            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
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
