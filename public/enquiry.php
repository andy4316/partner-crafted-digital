<?php
/**
 * AB Digital Consultancy — enquiry form handler (Hostinger shared hosting).
 *
 * Flow: validate → save to enquiry-data/enquiries.jsonl → email (Resend or mail()) → JSON response.
 * Optional overrides live in enquiry-config.php (see enquiry-config.sample.php). Never commit that file.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const DATA_DIR = __DIR__ . '/enquiry-data';
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600;

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_config(): array
{
    $defaults = [
        'to' => 'hello@abdigitalconsultancy.in',
        'from' => 'hello@abdigitalconsultancy.in',
        'resend_api_key' => '',
    ];
    $file = __DIR__ . '/enquiry-config.php';
    if (is_file($file)) {
        $custom = include $file;
        if (is_array($custom)) {
            return array_merge($defaults, $custom);
        }
    }
    return $defaults;
}

function ensure_data_dir(): bool
{
    if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0750, true) && !is_dir(DATA_DIR)) {
        return false;
    }
    $htaccess = DATA_DIR . '/.htaccess';
    if (!is_file($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n");
    }
    $index = DATA_DIR . '/index.html';
    if (!is_file($index)) {
        @file_put_contents($index, '');
    }
    return is_writable(DATA_DIR);
}

function log_line(string $file, string $line): void
{
    @file_put_contents(DATA_DIR . '/' . $file, $line . "\n", FILE_APPEND | LOCK_EX);
}

/** Strip CR/LF (and other control chars) so values are safe inside mail headers. */
function header_safe(string $value): string
{
    return trim((string) preg_replace('/[\r\n\t\x00-\x1F\x7F]+/', ' ', $value));
}

function str_len(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function client_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** Same-site check: Origin (or Referer as fallback) host must match this server's host. */
function origin_allowed(): bool
{
    $host = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
    if ($host === '') {
        return false;
    }
    $source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
    if ($source === '' || $source === 'null') {
        return false;
    }
    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
    $strip = static fn (string $h): string => preg_replace('/^www\./', '', $h) ?? $h;
    return $sourceHost !== '' && $strip($sourceHost) === $strip($host);
}

/** Returns true if this IP is still under the limit (and records the attempt). */
function rate_limit_ok(string $ip): bool
{
    $file = DATA_DIR . '/rate-limit.json';
    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return true; // fail open rather than block real visitors
    }
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $data = json_decode($raw !== false && $raw !== '' ? $raw : '{}', true);
    if (!is_array($data)) {
        $data = [];
    }
    $now = time();
    $key = hash('sha256', $ip);
    foreach ($data as $k => $stamps) {
        $data[$k] = array_values(array_filter((array) $stamps, static fn ($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW));
        if ($data[$k] === []) {
            unset($data[$k]);
        }
    }
    $hits = $data[$key] ?? [];
    $allowed = count($hits) < RATE_LIMIT_MAX;
    if ($allowed) {
        $hits[] = $now;
        $data[$key] = $hits;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, (string) json_encode($data));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return $allowed;
}

function send_via_resend(array $config, string $replyTo, string $subject, string $text): bool
{
    if (!function_exists('curl_init')) {
        return false;
    }
    $payload = json_encode([
        'from' => 'AB Digital Website <' . header_safe($config['from']) . '>',
        'to' => [header_safe($config['to'])],
        'reply_to' => $replyTo,
        'subject' => $subject,
        'text' => $text,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . header_safe((string) $config['resend_api_key']),
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $payload,
    ]);
    $response = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $response !== false && $code >= 200 && $code < 300;
}

function send_via_mail(array $config, string $replyTo, string $subject, string $text): bool
{
    $from = header_safe($config['from']);
    $headers = [
        'From: AB Digital Website <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return @mail(header_safe($config['to']), $encodedSubject, $text, implode("\r\n", $headers), '-f' . $from);
}

// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

if (!origin_allowed()) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (str_contains($contentType, 'application/json')) {
    $input = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($input)) {
        respond(400, ['ok' => false, 'error' => 'Invalid request.']);
    }
} else {
    $input = $_POST;
}

$field = static function (string $key) use ($input): string {
    $value = $input[$key] ?? '';
    return is_scalar($value) ? trim((string) $value) : '';
};

// Honeypot: bots fill it, people never see it. Pretend success.
if ($field('company_site') !== '') {
    respond(200, ['ok' => true]);
}

$data = [
    'name' => $field('name'),
    'business' => $field('business'),
    'email' => $field('email'),
    'phone' => $field('phone'),
    'industry' => $field('industry'),
    'website' => $field('website'),
    'message' => $field('message'),
    'enquiry_type' => $field('enquiry_type') ?: 'enquiry',
    'service_type' => $field('service_type') ?: 'website',
];

$errors = [];
$len = static fn (string $k): int => str_len($data[$k]);
if ($len('name') < 2 || $len('name') > 100) {
    $errors['name'] = 'Name must be 2–100 characters.';
}
if ($len('email') > 255 || filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($len('phone') < 6 || $len('phone') > 30) {
    $errors['phone'] = 'Phone must be 6–30 characters.';
}
if ($len('message') < 10 || $len('message') > 2000) {
    $errors['message'] = 'Message must be 10–2000 characters.';
}
if ($len('business') > 120) {
    $errors['business'] = 'Business name is too long.';
}
if ($len('industry') > 120) {
    $errors['industry'] = 'Description is too long.';
}
if ($len('website') > 255) {
    $errors['website'] = 'Website address is too long.';
}
if (!in_array($data['enquiry_type'], ['enquiry', 'sample_request'], true)) {
    $errors['enquiry_type'] = 'Invalid enquiry type.';
}
if (!in_array($data['service_type'], ['website', 'iso', 'other'], true)) {
    $errors['service_type'] = 'Invalid service type.';
}
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the form.', 'fields' => $errors]);
}

$dirOk = ensure_data_dir();
$ip = client_ip();

if ($dirOk && !rate_limit_ok($ip)) {
    respond(429, ['ok' => false, 'error' => 'Too many enquiries. Please try again later.']);
}

$id = bin2hex(random_bytes(8));
$record = ['id' => $id, 'received_at' => gmdate('c'), 'ip' => $ip] + $data + [
    'user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
];

// 1. Save first, so nothing is lost if email fails.
$saved = $dirOk && @file_put_contents(
    DATA_DIR . '/enquiries.jsonl',
    json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n",
    FILE_APPEND | LOCK_EX
) !== false;

// 2. Then email.
$config = load_config();
$kindLabel = $data['enquiry_type'] === 'sample_request' ? 'Free sample request' : 'Enquiry';
$serviceLabels = ['website' => 'Website Development', 'iso' => 'ISO Certification', 'other' => 'Not sure yet / Something else'];
$subject = header_safe($kindLabel . ' (' . $serviceLabels[$data['service_type']] . ') from ' . $data['name']);
$replyTo = header_safe($data['email']);
$text = implode("\n", [
    "New {$kindLabel} from the AB Digital website",
    '',
    'Type:      ' . $kindLabel,
    'Service:   ' . $serviceLabels[$data['service_type']],
    'Name:      ' . $data['name'],
    'Business:  ' . ($data['business'] ?: '—'),
    'Email:     ' . $data['email'],
    'Phone:     ' . $data['phone'],
    'Industry:  ' . ($data['industry'] ?: '—'),
    'Website:   ' . ($data['website'] ?: '—'),
    '',
    'Message:',
    $data['message'],
    '',
    '---',
    'Reference: ' . $id . ' · ' . $record['received_at'] . ($saved ? '' : ' · NOT SAVED TO DISK'),
]);

$useResend = trim((string) $config['resend_api_key']) !== '';
$emailed = $useResend
    ? send_via_resend($config, $replyTo, $subject, $text)
    : send_via_mail($config, $replyTo, $subject, $text);

if ($dirOk) {
    log_line('email-log.txt', sprintf(
        '%s %s id=%s via=%s saved=%s',
        gmdate('c'),
        $emailed ? 'EMAIL_OK' : 'EMAIL_FAILED',
        $id,
        $useResend ? 'resend' : 'mail',
        $saved ? 'yes' : 'no'
    ));
}

if (!$saved && !$emailed) {
    respond(500, ['ok' => false, 'error' => 'Could not process the enquiry.']);
}

respond(200, ['ok' => true]);
