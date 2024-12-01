<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

// Get today's and yesterday's dates
$todayDate = date('Y-m-d');
$yesterdayDate = date('Y-m-d', strtotime('-1 day'));

// Initialize response array
$overview = [
    'totalProduct' => 0,
    'todaySell' => 0,
    'yesterdaySell' => 0,
    'totalSell' => 0,
    'productReserved' => 0,
    'stockIssues' => 0,
];

// Total Products
$totalProductQuery = "SELECT COUNT(*) as total FROM products";
if ($result = $conn->query($totalProductQuery)) {
    $overview['totalProduct'] = (int)$result->fetch_assoc()['total'];
} else {
    error_log("Query failed: " . $conn->error);
}

// Today's Sales
$todaySellQuery = "SELECT SUM(quantity) as today_sell FROM order_details WHERE date = '$todayDate'";
if ($result = $conn->query($todaySellQuery)) {
    $overview['todaySell'] = (float)$result->fetch_assoc()['today_sell'] ?? 0;
} else {
    error_log("Query failed: " . $conn->error);
}

// Yesterday's Sales
$yesterdaySellQuery = "SELECT SUM(quantity) as yesterday_sell FROM order_details WHERE date = '$yesterdayDate'";
if ($result = $conn->query($yesterdaySellQuery)) {
    $overview['yesterdaySell'] = (float)$result->fetch_assoc()['yesterday_sell'] ?? 0;
} else {
    error_log("Query failed: " . $conn->error);
}

// Total Sales
$totalSellQuery = "SELECT SUM(quantity) as total_sell FROM order_details";
if ($result = $conn->query($totalSellQuery)) {
    $overview['totalSell'] = (float)$result->fetch_assoc()['total_sell'] ?? 0;
} else {
    error_log("Query failed: " . $conn->error);
}

// Reserved Products
$productReservedQuery = "SELECT SUM(stock_amount) as reserved FROM products";
if ($result = $conn->query($productReservedQuery)) {
    $overview['productReserved'] = (float)$result->fetch_assoc()['reserved'] ?? 0;
} else {
    error_log("Query failed: " . $conn->error);
}

// Stock Issues (Assuming there is a separate table for stock issues)
$stockIssuesQuery = "SELECT SUM(issue_amount) as stock_issues FROM stock_issues"; // Adjust table/column names as needed
if ($result = $conn->query($stockIssuesQuery)) {
    $overview['stockIssues'] = (float)$result->fetch_assoc()['stock_issues'] ?? 0;
} else {
    error_log("Query failed: " . $conn->error);
}

// Output the overview data as JSON
echo json_encode($overview);

$conn->close();
?>
