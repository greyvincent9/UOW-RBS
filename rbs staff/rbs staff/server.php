<?php 

// Starting the session, necessary
// for using session variables
session_start();

// Declaring and hoisting the variables
$username = "";
$email = "";
$errors = array(); 
$_SESSION['success'] = "";

// DBMS connection code -> hostname,
// username, password, database name
$con = mysqli_connect('localhost', 'root','','rbs');


// User login
if (isset($_POST['loginUser'])) {
	
	// Data sanitization to prevent SQL injection
	$username = mysqli_real_escape_string($con, $_POST['username']);
	$password = mysqli_real_escape_string($con, $_POST['password']);

	// Error message if the input field is left blank
	if (empty($username)) {
		array_push($errors, "Username is required");
	}
	if (empty($password)) {
		array_push($errors, "Password is required");
	}

	// Checking for the errors
	if (count($errors) == 0) {
		
		
		$password = md5($password);
		
		$query = "SELECT * FROM users WHERE username=
				'$username' AND password='$password'";
		$results = mysqli_query($con, $query);

		// $results = 1 means that one user with the
		// entered username exists
		if (mysqli_num_rows($results) == 1) {
			
			// Storing username in session variable
			$_SESSION['username'] = $username;
			
			// Welcome message
			$_SESSION['success'] = "You have logged in!";
			
			// Page on which the user is sent
			// to after logging in
			$query1 = "SELECT roles FROM users where roles = 'staff' AND username= '$username' AND password='$password'";
			$results1 = mysqli_query($con, $query1);
			
			if(mysqli_num_rows($results1) == 1){
				header('location: StaffPage.php');
			}else{
				
		}
		}
		else {
			
			// If the username and password doesn't match
			array_push($errors, "Username or password incorrect"); 
		}
	}
}

?>
