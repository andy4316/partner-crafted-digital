<?php
/**
 * Copy this file to enquiry-config.php on the server (same folder as enquiry.php)
 * and fill in real values there. enquiry-config.php is gitignored — never commit it.
 */
return [
    'to' => 'hello@abdigitalconsultancy.in',
    'from' => 'hello@abdigitalconsultancy.in',
    // Leave empty to send with PHP mail(). Set a Resend API key to send via Resend instead.
    'resend_api_key' => '',
];
