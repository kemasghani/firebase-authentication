<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 604800");
header("Access-Control-Request-Headers: x-requested-with, content-type");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by, content-type");

// Include your Firebase database setup (dbcon.php) here
include("dbcon.php");

// Retrieve all users from Firebase Realtime Database
$usersRef = $database->getReference('users');
$usersData = $usersRef->getValue();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the raw POST data as JSON
    $post_data = file_get_contents("php://input");
    // Decode the JSON data
    $data = json_decode($post_data, true);

    // Check if the JSON data contains 'username' and 'password'
    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        // Initialize a flag to track if authentication succeeds
        $authenticated = false;

        // Iterate through each user in $usersData
        foreach ($usersData as $userData) {
            // Check if the provided username exists in the current user's data
            if (isset($userData['username']) && $userData['username'] === $username) {
                // Verify the password for the current user
                if (isset($userData['password']) && $userData['password'] === $password) {
                    $output['msg'] = "Success";
                    $output['user']['username'] = $username;
                    $output['error'] = false;

                    // Set the authenticated flag to true
                    $authenticated = true;
                    break; // Exit the loop since authentication succeeded
                }
            }
        }

        // If authentication fails, set an error message
        if (!$authenticated) {
            $output['error'] = true;
            $output['msg'] = "Authentication failed";
        }
    } else {
        // Handle missing 'username' or 'password' fields in the JSON data
        $output['error'] = true;
        $output['msg'] = 'Missing username or password';
    }
} else {
    // Handle other HTTP methods (GET, PUT, DELETE, OPTIONS) or invalid requests here
    // You can return an appropriate response or error message
    $output['error'] = true;
    $output['msg'] = 'Invalid request method';
}

// Set the content type header to JSON
header('Content-Type: application/json');

// Encode the output array as JSON and send it
echo json_encode($output);
?>
