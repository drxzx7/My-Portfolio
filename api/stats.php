<?php
/**
 * =========================================================================
 * 📊 AHMAD SHUAIB PORTFOLIO — STATS API WITH EDGE CACHE & CDN HEADERS
 * Optimized for 1M+ Requests with HTTP 304 Not Modified & Stale-While-Revalidate
 * =========================================================================
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');

// High-concurrency edge caching headers:
// Cache at CDN for 1 hour, browser for 15 mins, allow stale serving for 24h
header('Cache-Control: public, max-age=900, s-maxage=3600, stale-while-revalidate=86400');

$stats = [
    'developer' => [
        'name' => 'Ahmad Shuaib',
        'title' => 'Backend & AI Engineer | High-Performance Systems Specialist',
        'location' => 'Chennai, Tamil Nadu, India',
        'degree' => 'B.E. Electronics and Communication Engineering',
        'motto' => 'One Debug, Infinite Realms.',
        'availability' => 'Open for Dev Duels & High-Impact Quests'
    ],
    'leetcode' => [
        'username' => 'x_drxzx_x',
        'profileUrl' => 'https://leetcode.com/u/x_drxzx_x/',
        'globalRank' => 273952,
        'totalSolved' => 445,
        'easy' => 125,
        'medium' => 232,
        'hard' => 88,
        'streakDays' => 200,
        'gfgSolved' => '100+',
        'mysqlSolved' => '100+'
    ],
    'github' => [
        'username' => 'drxzx7',
        'profileUrl' => 'https://github.com/drxzx7',
        'publicRepos' => 16,
        'flagshipProject' => 'leetcode-patterns-platform',
        'liveDemo' => 'https://leetcode-patterns-platform-jqfj.vercel.app/'
    ],
    'systemDesign' => [
        'scaleCapability' => '1,000,000+ Concurrent Requests / Day',
        'architecture' => 'Edge CDN + Static First Assets + Asynchronous Rate-Limited PHP/Node API',
        'meanResponseTime' => '< 25ms TTFB via Edge Cache',
        'securityCompliance' => 'Strict CSP, HSTS, Atomic Locking, Honeypot Anti-Spam'
    ]
];

$etag = '"' . md5(json_encode($stats)) . '"';
header('ETag: ' . $etag);

if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
    http_response_code(304);
    exit;
}

echo json_encode($stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

