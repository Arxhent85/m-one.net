<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Get POST data (JSON)
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

if (!$decoded) {
    // Fallback to standard POST
    $decoded = $_POST;
}

$name = strip_tags(trim($decoded["name"] ?? ''));
$email = filter_var(trim($decoded["email"] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = strip_tags(trim($decoded["subject"] ?? 'M-ONE Kontaktanfrage'));
$message = strip_tags(trim($decoded["message"] ?? ''));

if (empty($name) || !$email || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Bitte füllen Sie alle erforderlichen Felder aus."]);
    exit;
}

$email_subject = "M-ONE Web-Anfrage: $subject";

$email_content = "Neue Nachricht über das M-ONE Kontaktformular:\n";
$email_content .= "--------------------------------------------------\n";
$email_content .= "Name: $name\n";
$email_content .= "E-Mail: $email\n";
$email_content .= "Betreff: $subject\n\n";
$email_content .= "Nachricht:\n$message\n";
$email_content .= "--------------------------------------------------\n";

function send_smtp_email_to_recipients($recipients, $subject, $body, $reply_to_name, $reply_to_email) {
    $host = "mail.m-one.net";
    $port = 465; // SSL
    $username = "info@m-one.net";
    $password = "!Sommer8585!";
    $timeout = 10;
    
    // Connect to server
    $socket = fsockopen("ssl://" . $host, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return false;
    }
    
    function read_smtp_response($socket, $expected) {
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) == " ") {
                break;
            }
        }
        $code = substr($response, 0, 3);
        if ($code != $expected) {
            return false;
        }
        return true;
    }
    
    try {
        if (!read_smtp_response($socket, "220")) return false;
        
        fwrite($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
        if (!read_smtp_response($socket, "250")) return false;
        
        fwrite($socket, "AUTH LOGIN\r\n");
        if (!read_smtp_response($socket, "334")) return false;
        
        fwrite($socket, base64_encode($username) . "\r\n");
        if (!read_smtp_response($socket, "334")) return false;
        
        fwrite($socket, base64_encode($password) . "\r\n");
        if (!read_smtp_response($socket, "235")) return false;
        
        fwrite($socket, "MAIL FROM: <$username>\r\n");
        if (!read_smtp_response($socket, "250")) return false;
        
        // Send to multiple recipients
        foreach ($recipients as $recipient) {
            fwrite($socket, "RCPT TO: <$recipient>\r\n");
            if (!read_smtp_response($socket, "250")) return false;
        }
        
        fwrite($socket, "DATA\r\n");
        if (!read_smtp_response($socket, "354")) return false;
        
        $msgId = "<" . md5(uniqid(microtime(), true)) . "@m-one.net>";
        $email = "Date: " . date("r") . "\r\n";
        // Show the first recipient in the To header
        $email .= "To: " . implode(", ", $recipients) . "\r\n";
        $email .= "From: M-ONE Web <$username>\r\n";
        $email .= "Reply-To: $reply_to_name <$reply_to_email>\r\n";
        $email .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $email .= "Message-ID: $msgId\r\n";
        $email .= "MIME-Version: 1.0\r\n";
        $email .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $email .= "Content-Transfer-Encoding: 8bit\r\n";
        
        $email .= "\r\n" . $body . "\r\n.\r\n";
        
        fwrite($socket, $email);
        if (!read_smtp_response($socket, "250")) return false;
        
        fwrite($socket, "QUIT\r\n");
        fclose($socket);
        return true;
    } catch (Exception $e) {
        fclose($socket);
        return false;
    }
}

// Wir senden die E-Mails an die internen Adressen. Gmail ruft diese dann über POP3 ab,
// um Spam-Blockaden durch direkte Weiterleitungen zu vermeiden.
$recipients = ["info@m-one.net"];

if (send_smtp_email_to_recipients($recipients, $email_subject, $email_content, $name, $email)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Ihre Nachricht wurde erfolgreich gesendet!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Fehler beim Senden der E-Mail auf dem Server."]);
}
?>
