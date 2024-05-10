<?php
session_start(); // Start the session at the very beginning
include 'connect.php';

// Get the ID from the URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Prepare the update statement
    if ($stmt = $conn->prepare("UPDATE `roomlist` SET `RoomLaunched` = FALSE WHERE `id` = ?")) {
        $stmt->bind_param("i", $id);

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $_SESSION['message'] = "Room Delaunched!";
        } else {
            $_SESSION['message'] = "Room Already Is Delaunched.";
        }

        $stmt->close();
    } else {
        $_SESSION['message'] = 'prepare() failed: ' . htmlspecialchars($conn->error);
    }
}

header("Location: StaffPage.php"); // Redirect
exit();
?>
