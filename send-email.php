<?php 
// Check if form was submitted (either via traditional form or AJAX)
if(isset($_POST['submit']) || (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']))){
    $to = "cesar@adparconstruction.com"; // this is your Email address
    $from = $_POST['info@adparconstruction.com']; // this is the sender's Email address
    
    // Handle name field (single field instead of first_name/last_name)
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $service = isset($_POST['service']) ? $_POST['service'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    
    $subject = "Form submission";
    $subject2 = "Copy of your form submission";
    
    // Build message for site owner
    $message_body = $name . " wrote the following:" . "\n\n";
    if (!empty($phone)) {
        $message_body .= "Phone: " . $phone . "\n";
    }
    if (!empty($service)) {
        $message_body .= "Project Type: " . $service . "\n";
    }
    $message_body .= "\n" . $message;
    
    // Build confirmation message for sender
    $message2 = "Here is a copy of your message " . $name . "\n\n";
    if (!empty($phone)) {
        $message2 .= "Phone: " . $phone . "\n";
    }
    if (!empty($service)) {
        $message2 .= "Project Type: " . $service . "\n";
    }
    $message2 .= "\n" . $message;

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    
    // Send emails
    $mail1_sent = mail($to, $subject, $message_body, $headers);
    $mail2_sent = mail($from, $subject2, $message2, $headers2); // sends a copy of the message to the sender
    
    // Return JSON response for AJAX/fetch requests
    header('Content-Type: application/json');
    
    if ($mail1_sent && $mail2_sent) {
        echo json_encode([
            'success' => true,
            'message' => "Mail Sent. Thank you " . $name . ", we will contact you shortly."
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send email. Please try again later.'
        ]);
    }
    exit;
}
?>

