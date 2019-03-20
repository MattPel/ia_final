<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		if ($_SERVER["HTTP_HOST"]==='localhost') {
			$servername = "localhost";
			$username = "root";
			$password = "";
			$dbname = "German_Class";
		} else {
			$servername = "localhost";
			$username = "pdxia";
			$password = "DxtXVa2nWZKvcFKt";
			$dbname = "pdx_ia_studman";
		}
		
		//establish the connection with database and server credentials
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		//if there is an error during connection do the following
		if ($conn->connect_error) {
			http_response_code(500);
            echo "<br> <br> <p id='zeroResults' style='text-align: center; font-size: 130%; color: #0d3800; font-weight: bold;'>
			Connection failed: " . $conn->connect_error . "</p>";
			die("Connection failed: " . $conn->connect_error);
		} 
		//if there is no error during connection do the following
		else{
			$sql = "SELECT Password FROM credentials WHERE Username='" . $_POST['uname'] . "'";
			
			$result = $conn->query($sql);
			
			//if the input matches the database record do the following
			if ($result){
				if ($result->num_rows==1){
					$row = $result->fetch_assoc();
					if (password_verify($_POST['psw'], $row['Password'])){
						echo "Successful login";
					}
					//if the input does not match the database record do the following
					else {
						echo "Error during login: Username and password do not match, please try again!";
					}
				}
				else {
					echo "Error during login: No user with username: " . htmlspecialchars($_POST['uname']);
				}
			}
			//if there has been an error during login do the following
			else{
				echo "Error during login: An error has occured, please refresh the page to try again!"; 
			}
			http_response_code(200);
		}
		//close the connection
		mysqli_close($conn);
		
	}
	else {
		http_response_code(403);
		echo "Error during login: There was a network problem , please try again later!";
	}
		
?>