<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

if (!isset($_GET['order_id']) || empty($_GET['order_id'])) {
    echo json_encode(['success' => false, 'message' => 'Order ID is required']);
    exit;
}

$orderId = intval($_GET['order_id']);

// Fetch order details
$orderQuery = "
    SELECT o.id AS order_id, o.order_date, o.status
    FROM orders o
    WHERE o.id = ?
";
$stmt = $conn->prepare($orderQuery);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$orderResult = $stmt->get_result();

if ($orderResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Order not found']);
    exit;
}

$orderData = $orderResult->fetch_assoc();

// Fetch order items
$itemsQuery = "
    SELECT p.product_name, oi.quantity, co.color_name, p.stock_amount
    FROM order_details oi
    JOIN products p ON oi.product_id = p.id
    JOIN colors co ON oi.color_id = co.id
    WHERE oi.order_id = ?
";
$stmt = $conn->prepare($itemsQuery);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$itemsResult = $stmt->get_result();

$orderItems = [];
while ($item = $itemsResult->fetch_assoc()) {
    $orderItems[] = $item;
}

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'order' => $orderData,
    'items' => $orderItems
]);
?>
