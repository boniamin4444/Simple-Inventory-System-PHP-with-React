<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && isset($data->password))
{
	$email = $data->email;
	$password = $data->password;

	// Check if the user exists and is active user

	$sql = "SELECT * FROM admins WHERE email = ? AND status = 'active'";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s",$email);
	$stmt->execute();
	$result = $stmt->get_result();

	/*echo "<pre>";
	print_r($result);
	echo "</pre>";

	die();*/

	if($result->num_rows > 0)
	{
		$user = $result->fetch_assoc();

		//Verify admin password

		if(password_verify($password, $user['password']))
		{
			echo json_encode(["success"=>true, "message"=>"Login Successfull"]);
		}

		else
		{
			echo json_encode(["success"=>false, "message"=>"Invalid Password"]);
		}
	}

	else
		{
			echo json_encode(["success"=>false, "message"=>"User not found or Inactive"]);
		}
		
}

else
{
	echo json_encode(["success"=>false, "message"=>"Email and Password Required"]);
}

$conn->close();

?>