<?php
/**
 * =========================================================================
 * 🛡️ AHMAD SHUAIB PORTFOLIO — HIGH-SECURITY CONTACT API
 * Hardened for 1M+ Visitor Scale, DDoS Mitigation & Strict Data Sanitization
 * =========================================================================
 */

// Disable error display in output to prevent path leakage
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Strict Security Headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

// Storage directory and files
$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0750, true);
}

// Protect storage directory with .htaccess if not already protected
$htaccessPath = $storageDir . '/.htaccess';
if (!file_exists($htaccessPath)) {
    @file_put_contents($htaccessPath, "Order allow,deny\nDeny from all\n<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>");
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Only POST is supported.'
    ]);
    exit;
}

// -------------------------------------------------------------
// 1. IP DETECTION & RATE LIMITING (Token-Bucket Simulation)
// -------------------------------------------------------------
function getClientIP() {
    $headers = [
        'HTTP_CF_CONNECTING_IP', // Cloudflare
        'HTTP_X_FORWARDED_FOR',  // Load balancers
        'HTTP_X_REAL_IP',        // Nginx proxy
        'REMOTE_ADDR'            // Direct IP
    ];
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ipList = explode(',', $_SERVER[$header]);
            $ip = trim($ipList[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

$clientIp = getClientIP();
$ipHash = hash('sha256', $clientIp);
$rateLimitFile = $storageDir . '/ratelimit_' . substr($ipHash, 0, 16) . '.json';

$rateLimitWindow = 600; // 10 minutes
$maxRequests = 5;       // max 5 submissions per 10 minutes per IP

$rateData = ['count' => 0, 'first_request' => time()];
if (file_exists($rateLimitFile)) {
    $existing = @json_decode(@file_get_contents($rateLimitFile), true);
    if (is_array($existing) && isset($existing['first_request'], $existing['count'])) {
        if (time() - $existing['first_request'] < $rateLimitWindow) {
            $rateData = $existing;
        }
    }
}

if ($rateData['count'] >= $maxRequests) {
    http_response_code(429);
    echo json_encode([
        'status' => 'error',
        'message' => 'Rate limit exceeded. Please wait a few minutes before sending another message.',
        'retry_after' => $rateLimitWindow - (time() - $rateData['first_request'])
    ]);
    exit;
}

// -------------------------------------------------------------
// 2. PARSE REQUEST BODY (JSON or Form URL-encoded)
// -------------------------------------------------------------
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$input = [];

if (stripos($contentType, 'application/json') !== false) {
    $rawBody = file_get_contents('php://input');
    if (strlen($rawBody) > 65536) { // Max 64KB payload limit
        http_response_code(413);
        echo json_encode(['status' => 'error', 'message' => 'Payload too large.']);
        exit;
    }
    $input = json_decode($rawBody, true) ?: [];
} else {
    $input = $_POST;
}

// -------------------------------------------------------------
// 3. HONEYPOT & TIME-BASED BOT TRAP
// -------------------------------------------------------------
// If honeypot is filled, silently succeed without writing data (fools bots)
if (!empty($input['website_hp']) || !empty($input['company_field'])) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your message has been received.'
    ]);
    exit;
}

// Optional submission timestamp check (bot if submitted in < 2 seconds)
if (isset($input['_ts']) && is_numeric($input['_ts'])) {
    $submissionElapsed = time() - intval($input['_ts']);
    if ($submissionElapsed < 2) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Message received!'
        ]);
        exit;
    }
}

// -------------------------------------------------------------
// 4. SANITIZATION & STRICT VALIDATION
// -------------------------------------------------------------
function cleanString($str, $maxLen = 500) {
    if (!is_string($str)) return '';
    $str = str_replace("\0", '', $str); // Remove null bytes
    $str = trim($str);
    if (mb_strlen($str, 'UTF-8') > $maxLen) {
        $str = mb_substr($str, 0, $maxLen, 'UTF-8');
    }
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name    = cleanString($input['name'] ?? '', 100);
$email   = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = cleanString($input['subject'] ?? 'New Portfolio Inquiry', 150);
$message = cleanString($input['message'] ?? '', 3000);

// Validation Rules
$errors = [];

if (mb_strlen($name, 'UTF-8') < 2) {
    $errors['name'] = 'Name must be at least 2 characters.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'A valid email address is required.';
}

if (mb_strlen($message, 'UTF-8') < 10) {
    $errors['message'] = 'Message must be at least 10 characters.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'message' => 'Validation failed.',
        'errors' => $errors
    ]);
    exit;
}

// -------------------------------------------------------------
// 5. ATOMIC STORAGE PERSISTENCE WITH EXCLUSIVE LOCKING & MAIL FORWARDING
// -------------------------------------------------------------
$recipientEmail = 'mssdkkl@gmail.com';

$messageEntry = [
    'id'         => bin2hex(random_bytes(10)),
    'timestamp'  => date('c'),
    'ip_hash'    => substr($ipHash, 0, 16),
    'name'       => $name,
    'email'      => $email,
    'subject'    => $subject,
    'message'    => $message,
    'recipient'  => $recipientEmail,
    'user_agent' => substr(cleanString($_SERVER['HTTP_USER_AGENT'] ?? '', 200), 0, 200)
];

// Attempt native PHP mail forwarding to user's Gmail if sendmail is configured
$mailHeaders = "From: noreply@ahmadshuaib.dev\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion() . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";
$mailBody = "New contact message from portfolio for Ahmad Shuaib:\n\n" .
            "Sender Name: " . $name . "\n" .
            "Sender Email: " . $email . "\n" .
            "Subject: " . $subject . "\n" .
            "Timestamp: " . date('Y-m-d H:i:s T') . "\n" .
            "IP: " . $clientIp . "\n\n" .
            "Message Content:\n" . $message . "\n";
@mail($recipientEmail, "[Portfolio Transmission] $subject", $mailBody, $mailHeaders);

$dataFile = $storageDir . '/messages.json';
$fp = @fopen($dataFile, 'c+');

if ($fp && flock($fp, LOCK_EX)) {
    $fileSize = filesize($dataFile);
    $allMessages = [];
    if ($fileSize > 0) {
        $existingContent = fread($fp, $fileSize);
        $allMessages = json_decode($existingContent, true) ?: [];
    }
    
    // Prepend latest message (capped to latest 1000 messages to prevent unbounded growth)
    array_unshift($allMessages, $messageEntry);
    if (count($allMessages) > 1000) {
        $allMessages = array_slice($allMessages, 0, 1000);
    }
    
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($allMessages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
}

// Update Rate Limit Counter
$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData));

// Clean up old rate limit files occasionally (1% probability)
if (mt_rand(1, 100) === 1) {
    $files = glob($storageDir . '/ratelimit_*.json');
    if ($files) {
        foreach ($files as $f) {
            if (time() - filemtime($f) > $rateLimitWindow) {
                @unlink($f);
            }
        }
    }
}

// -------------------------------------------------------------
// 6. SUCCESS RESPONSE
// -------------------------------------------------------------
http_response_code(200);
echo json_encode([
    'status'  => 'success',
    'message' => 'Message delivered safely to Ahmad Shuaib. I will respond to you shortly!'
]);

