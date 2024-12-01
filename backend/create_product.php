<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $product_name = $_POST['product_name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $stock_amount = $_POST['stock_amount'];
    $status = $_POST['status'];
    $category = isset($_POST['category']) ? $_POST['category'] : ''; // Retrieve category

    // Handle file upload
    $image = '';
    if (isset($_FILES['image']['name']) && $_FILES['image']['name'] != '') {
        $target_dir = "uploads/";
        $image = $target_dir . basename($_FILES['image']['name']);
        
        // Move the uploaded file to the target directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $image)) {
            // File successfully uploaded
        } else {
            echo json_encode(["success" => false, "error" => "Failed to move uploaded file."]);
            exit();
        }
    }

    // Prepare SQL query
    $query = "INSERT INTO products (category, product_name, description, price, image, stock_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Prepare and execute statement
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("sssisis", $category, $product_name, $description, $price, $image, $stock_amount, $status);
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}

$conn->close();
?>
