<?php
header('Content-Type: application/json');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if(isset($_POST)) {
      
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "andrew.lee12@gmail.com";
    $email_subject = "Form Enquiry";
 
    $name = $_POST['clientName'];
    $email_from = $_POST['clientEmail'];
    $telephone = $_POST['clientPhone'];
    $message = $_POST['clientMessage'];
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";
 
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();

mail($email_to, $email_subject, $email_message, $headers);  
?>

{
    <!-- console degugger check to see if the form submitted correctly -->
    "success": true,
} 
 
<?php
 
} else {
?>   
{
    "success": false
} 
<?php
}
?>
