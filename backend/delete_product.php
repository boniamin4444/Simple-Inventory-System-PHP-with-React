<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");

// Include the database configuration file
include('config.php');

// Retrieve the product ID from the request
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Create a response array
$response = array('success' => false, 'error' => '');

// Prepare and execute the SQL query
if ($id > 0) {
    $sql = "DELETE FROM products WHERE id = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['error'] = 'Failed to delete the product.';
        }
        $stmt->close();
    } else {
        $response['error'] = 'Failed to prepare the SQL query.';
    }
} else {
    $response['error'] = 'Invalid product ID.';
}

// Close the database connection
$conn->close();

// Output the response as JSON
echo json_encode($response);
?>
