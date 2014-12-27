<?php

include ("PHPMailer/class.phpmailer.php");

if (!isset($_POST['u']) || !$_POST['u'] || !isset($_POST['c']) || !in_array($_POST['c'], array('y', 'n'))) {
    echo 0;
    die();
}

$rsvp             = $_POST['c'] == 'n' ? '<strong>NO</strong>': '';
$rsvpSubject      = $_POST['c'] == 'n' ? 'NO': 'YES';

$mail             = new PHPMailer();
$body             = sprintf("Olá, <strong>%s</strong> acabou de confimar que %s comparecerá!", $_POST['u'], $rsvp);

$mail->IsSMTP();
$mail->SMTPAuth   = true;
$mail->SMTPSecure = "ssl";
$mail->Host       = "smtp.gmail.com";
$mail->Port       = 465;
$mail->CharSet    = "UTF-8";

$mail->Username   = getenv("RSVP_EMAIL_USERNAME");
$mail->Password   = getenv("RSVP_EMAIL_PASSWORD");

$mail->From       = getenv("RSVP_EMAIL_FROM");
$mail->FromName   = "Victor & Anne";
$mail->Subject    = sprintf("(%s) Confirmação de Presença", $rsvpSubject);
$mail->AltBody    = sprintf("Olá, %s acabou de confirmar que que %s comparecerá!", $_POST['u'], $rsvp);
$mail->WordWrap   = 100;

$mail->MsgHTML($body);

$mail->AddAddress(
    getenv("RSVP_EMAIL_TO"),
    "Victor Cinaglia"
);

$mail->IsHTML(true); // send as HTML

if(!$mail->Send()) {
  echo 0;
} else {
  echo 1;
}

die();

?>