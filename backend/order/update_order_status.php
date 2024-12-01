<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['order_id']) || !isset($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Order ID and status are required']);
    exit;
}

$orderId = intval($data['order_id']);
$status = $data['status'];

if (!in_array($status, ['pending', 'approved', 'rejected'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid status']);
    exit;
}

$conn->begin_transaction();

try {
    // Update order status
    $updateQuery = "UPDATE orders SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("si", $status, $orderId);
    if (!$stmt->execute()) {
        throw new Exception('Failed to update status');
    }
    
    // If status is approved, update stock amounts
    if ($status === 'approved') {
        // Fetch order items
        $itemsQuery = "
            SELECT product_id, quantity
            FROM order_details
            WHERE order_id = ?
        ";
        $stmt = $conn->prepare($itemsQuery);
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $itemsResult = $stmt->get_result();

        while ($item = $itemsResult->fetch_assoc()) {
            $productId = intval($item['product_id']);
            $quantity = intval($item['quantity']);
            
            // Update product stock
            $stockQuery = "UPDATE products SET stock_amount = stock_amount - ? WHERE id = ?";
            $stmt = $conn->prepare($stockQuery);
            $stmt->bind_param("ii", $quantity, $productId);
            if (!$stmt->execute()) {
                throw new Exception('Failed to update stock amount for product ID ' . $productId);
            }
        }
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
