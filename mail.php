<?php
if(isset( $_POST['contact-form']))
$name = $_POST['name'];
if(isset( $_POST['contact-form']))
$email = $_POST['email'];
if(isset( $_POST['contact-form']))
$message = $_POST['message'];
if(isset( $_POST['contact-form']))
$subject = $_POST['subject'];

$content="From: $name \n Email: $email \n Message: $message";
$recipient = "adananimaldesign@gmail.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
echo "Email sent!";
?>