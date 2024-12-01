<?php
header("Access-Control-Allow-Origin: *"); // For development only
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Include the database connection file
include '../config.php';

// Example request body: { "customer_id": 1, "items": [{"product_id": 1, "color_id": 2, "quantity": 3}] }
$data = json_decode(file_get_contents('php://input'), true);

// Check if input data is valid
if (!isset($data['customer_id']) || !isset($data['items']) || !is_array($data['items'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit;
}

try {
    // Begin transaction
    $conn->begin_transaction();

    // Insert order
    $stmt = $conn->prepare("INSERT INTO orders (customer_id) VALUES (?)");
    $stmt->bind_param("i", $data['customer_id']);
    if (!$stmt->execute()) {
        throw new Exception("Failed to insert order: " . $stmt->error);
    }
    $orderId = $conn->insert_id;

    // Insert order details
    $stmt = $conn->prepare("INSERT INTO order_details (order_id, product_id, color_id, quantity) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    $stmt->bind_param("iiii", $orderId, $productId, $colorId, $quantity);

    foreach ($data['items'] as $item) {
        $productId = $item['product_id'];
        $colorId = $item['color_id'];
        $quantity = $item['quantity'];
        if (!$stmt->execute()) {
            throw new Exception("Failed to insert order details: " . $stmt->error);
        }
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(["status" => "success", "order_id" => $orderId]);

} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
