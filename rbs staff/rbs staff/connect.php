<?php
    $servername = "localhost"; //Host name
    $username = "root"; //Host username
     //Host Password
    $dbname = "rbs"; //Dbname

    //connection to the database
    $conn = new mysqli($servername, $username,"", $dbname);
    
    //error message
    if ($conn->connect_errno) {
        echo "Failed to connect to MySQL: " . $conn->connect_error;
        exit();
    }

?>