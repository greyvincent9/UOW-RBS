<?php include('server.php') ?>

<!DOCTYPE html>
<html>
<head>
<style>
.button {
  font: bold 11px Arial;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
}
</style>
	<title>
	</title>
	
	<link rel="stylesheet" type="text/css"
			href="style.css">
</head>
<body>
	<div class="header">
		<h2>Room Booking System</h2>
	</div>
	
	<form method="post" action="login.php">

		<div class="input-group">
			<label>Enter Username</label>
			<input type="text" name="username" required>
		</div>
		<div class="input-group">
			<label>Enter Password</label>
			<input type="password" name="password" required>
		</div>
		<div class="input-group">
			<a type="submit" class="button" href="http://localhost/StaffPage.php"
						name="loginUser">
				Login
			</a>
		</div>
	</form>
</body>

</html>
