<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Include database configuration
include 'config.php';

// SQL query to fetch products
$sql = "SELECT p.id, p.product_name, p.price, p.stock_amount, p.status, c.name AS category_name, p.image
        FROM products p
        JOIN categories c ON p.category = c.id";


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch all products
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    // Return JSON response
    echo json_encode(['products' => $products]);
} else {
    echo json_encode(['products' => []]);
}

// Close connection
$conn->close();
?>
