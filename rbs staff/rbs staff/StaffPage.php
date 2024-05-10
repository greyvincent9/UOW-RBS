<?php
    $servername = "localhost"; //name
    $username = "root"; //username
    $dbname = "rbs"; //Database

    //connection to the database
    $conn = new mysqli($servername, $username, "", $dbname);
   
    //show error message
    if ($conn->connect_errno) {
        echo "Failed to connect to MySQL: " . $conn->connect_error;
        exit();
    }

    if(isset($_POST["btnCreateRm"])){
        $roomName = trim($conn->real_escape_string($_POST["RoomName"]));
        $roomDate = trim($conn->real_escape_string($_POST["RoomDate"]));
        $roomTime = trim($conn->real_escape_string($_POST["RoomTime"]));
        $roomCapacity = trim($conn->real_escape_string($_POST["RoomCapacity"]));
        $roomPrice = trim($conn->real_escape_string($_POST["RoomPrice"]));
        $roomPromotion = trim($conn->real_escape_string($_POST["RoomPromotion"]));

        if ($stmt = $conn->prepare("INSERT INTO `roomlist`(`RoomName`, `RoomDate`, `RoomTime`, `RoomCapacity`, `RoomPrice`, `RoomPromotion`) VALUES (?, ?, ?, ?, ?, ?)")) {
            $stmt->bind_param("ssssis", $roomName, $roomDate, $roomTime, $roomCapacity, $roomPrice, $roomPromotion);
            $stmt->execute(); 
            $stmt->close();
        } else {
            die('prepare() failed: ' . htmlspecialchars($conn->error));
        }

    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Staff Page</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/c82e9a37b7.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.standalone.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap4.min.css">
    

    <style>
        body {
            background: #e9ecef;
            font-family: sans-serif;
        }
    </style>
</head>
<body class="py-4">
    <?php
    session_start(); // Start the session

    // Check if a message  is set in the session
    if (isset($_SESSION['message'])) {
        
        // Display the message
        echo "<div class='alert alert-info' role='alert'>" . $_SESSION['message'] . "</div>";
        // Clear the message from the session
        unset($_SESSION['message']);
    }
    ?>
    <main class="container-fluid">
        <div class="row mt-2">
            <div class="offset-2 col-8 mt-5">
			<h2 style="text-align: center;">Welcome to Staff Page</h2>
			<a class="btn btn-info" href="login.php">Log Out</a>
			<br></br>
                <table class="table table-striped table-bordered text-center" id="datatable">
                    <legend class="p-3 mb-2 bg-info text-light rounded ">
                        <h2 class="m-0 text-center" >Rooms Available</h2>
                    </legend>
                    <thead class="text-center">
                        <th>ID</th>
                        <th>Room Name</th>
                        <th>Date</th>
                        <th>Timeslot</th>
                        <th>Capacity</th>
                        <th>Price(S$)</th>
                        <th>Promotional Codes</th>
                        <th colspan="3">Actions</th>
                    </thead>
                    <tbody>
                        <?php                         
                            // Display info according to database table data
                            if ($stmt = $conn->prepare("SELECT * FROM `roomlist`")) {
                                $stmt->execute();
                                $result = $stmt->get_result();
                                while ($row = $result->fetch_assoc()) {
                                    echo "<tr>".
                                            "<td>".$row["id"]."</td>".
                                            "<td>".$row["RoomName"]."</td>".
                                            "<td>".$row["RoomDate"]."</td>".
                                            "<td>".$row["RoomTime"]."</td>".
                                            "<td>".$row["RoomCapacity"]."</td>".
                                            "<td>".$row["RoomPrice"]."</td>".
                                            "<td>".$row["RoomPromotion"]."</td>".
                                            "<td><a href='StaffUpdate.php?id=".$row["id"]."' class='btn btn-primary'>Update</a></td>".
                                            "<td><a href='StaffLaunch.php?id=".$row["id"]."' class='btn btn-success'>Launch</a></td>".
											"<td><a href='StaffDislaunch.php?id=".$row["id"]."' class='btn btn-dark'>Delaunch</a></td>".
                                            "<td><a href='StaffDelete.php?id=".$row["id"]."' class='btn btn-danger' onclick='return confirm(\"Delete this room?\")'>Delete</a></td>".
                                        "</tr>";
                                }
                                $stmt->close();
                            } else {
                                die('prepare() failed: ' . htmlspecialchars($conn->error));
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>


        
        <div class="popup">
            <form action="" method="post" class="form">
                <h2  class="m-0 text-center">Room Details</h2>
                <div class="form-element">
                    <label for="RoomName">Room Name:</label>
                    <input type="text" class="form-control" name="RoomName" required placeholder="Privacy Pod">
                </div>
                <div class="form-element">
                    <label for="selectdate">Date:</label>
                    <input type="text" class="form-control datepicker" name="RoomDate" id="RoomDate" required>
                </div>
                <div class="form-element">
                    <label for="RoomTime">Timeslot:</label>
                    <select class="form-element" name="RoomTime" required>
                        <option value="9am -10am">9am -10am</option>
                        <option value="11am-12pm">11am-12pm</option>
                        <option value="3pm-4pm">3pm-4pm</option>
                    </select>
                </div>
                <div class="form-element">
                    <label for="RoomCapacity">Room Capacity:</label>
                    <select class="form-element" name="RoomCapacity" required>
                        <option value="2 pax">2 pax</option>
                        <option value="3 pax">3 pax</option>
                        <option value="4 pax">4 pax</option>
                        <option value="5 pax">5 pax</option>
                    </select>
                </div>
                <div class="form-element">
                    <label for="RoomPrice">Price:</label>
                    <input type="number" value=5.00 class="form-control" name="RoomPrice"  step="0.01">
                </div>
                <div class="form-element">
                    <label for="RoomPromotion">Promotional Codes:</label>
                    <input type="text" class="form-control" name="RoomPromotion" required>
                </div>

                <div class="form-element">
                    <button type="submit" name="btnCreateRm">Create Room</button>
                </div>
            </form>
            </div>
        </div>
    </main>

    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap4.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.datepicker').datepicker({
                autoclose: true,
                todayHighlight: true,
                todayBtn: 'linked',
                startDate: 'today',
            });

            $('#datatable').DataTable();

            $('#BookDateTime').keypress(function(e) {
                e.preventDefault();
            });
        });
    </script>

</body>
</html>

 