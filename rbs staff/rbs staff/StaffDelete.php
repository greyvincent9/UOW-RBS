<?php
include 'connect.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    if ($stmt = $conn->prepare("DELETE FROM `roomlist` WHERE id = ?")) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            header("Location: StaffPage.php");
            exit();
        } else {
            echo "Error: Unable to execute the SQL statement.";
        }
        $stmt->close();
    } else {
        echo "Error: Unable to prepare the SQL statement.";
    }
}
?>
