<?php
include 'connect.php';

$id = $_GET['id'];

$sql = "SELECT * FROM `roomlist` WHERE id= $id ";
$result = mysqli_query($conn, $sql);
if($result) {
    $row = mysqli_fetch_assoc($result);
    $rmName= $row['RoomName'];
    $rmDate= $row['RoomDate'];
    $rmTime= $row['RoomTime'];
    $rmCapacity= $row['RoomCapacity'];
    $rmPrice= $row['RoomPrice'];
    $rmPromotion= $row['RoomPromotion'];

    if(isset($_POST['update'])){
        $rmName= $_POST['rmName'];
        $rmDate= $_POST['rmDate'];
        $rmTime= $_POST['rmTime'];
        $rmCapacity= $_POST['rmCapacity'];
        $rmPrice= $_POST['rmPrice'];
        $rmPromotion= $_POST['rmPromotion'];

        $sql = "update `roomlist` set RoomName='$rmName', RoomDate='$rmDate', RoomTime='$rmTime', RoomCapacity='$rmCapacity', RoomPrice='$rmPrice',  RoomPromotion='$rmPromotion' WHERE id=$id";
        $result=mysqli_query($conn, $sql);
        if($result){
            // Redirect to another page
            header("Location: StaffPage.php");
            exit();
        }else{
            die(mysqli_error($conn));
        }
    }
} else {
    die(mysqli_error($conn));
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

    <title>Update Data</title>
	<a class="btn btn-info" href="login.php">Log Out</a>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/c82e9a37b7.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.standalone.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap4.min.css">
    


</head>
<body>
<div class="container my-5">
    <form method="post" action="">
        <div class="form-group">
            <label>Room Name</label>
            <input type="text" class="form-control" autocomplete="off" name="rmName" value="<?php echo $rmName; ?>">
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control datepicker" name="rmDate" id="RoomDate" required autocomplete="off" value="<?php echo $rmDate; ?>">
        </div>
        <div class="form-group">
            <label>Timeslot</label>
            <select class="form-element" name="rmTime" required>
                <option value="10am-11am" <?php if ($rmTime == '10am-11am') echo 'selected'; ?>>10am-11am</option>
                <option value="12pm - 1pm" <?php if ($rmTime == '12pm - 1pm') echo 'selected'; ?>>12pm - 1pm</option>
                <option value="2pm - 3pm" <?php if ($rmTime == '2pm - 3pm') echo 'selected'; ?>>2pm - 3pm</option>
            </select>
        </div>
        <div class="form-group">
            <label>Capacity</label>
            <select class="form-element" name="rmCapacity" required>
                <option value="1-2 pax" <?php if ($rmCapacity == '1-2 pax') echo 'selected'; ?>>1-2 pax</option>
                <option value="1-3 pax" <?php if ($rmCapacity == '1-3 pax') echo 'selected'; ?>>1-3 pax</option>
                <option value="1-4 pax" <?php if ($rmCapacity == '1-4 pax') echo 'selected'; ?>>1-4 pax</option>
                <option value="1-5 pax" <?php if ($rmCapacity == '1-5 pax') echo 'selected'; ?>>1-5 pax</option>
            </select>
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" autocomplete="off" name="rmPrice" value="<?php echo $rmPrice; ?>" step="0.01" disabled readonly>
        </div>
        <div class="form-group">
            <label>Promotional Code</label>
            <input type="text" class="form-control" autocomplete="off" name="rmPromotion" value="<?php echo $rmPromotion; ?>">
        </div>

        <button type="submit" class="btn btn-dark btn-lg" name="update" value="update">Update</button>
    </form>
</div>




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