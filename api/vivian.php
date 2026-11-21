<?php
/**
 * =========================================================================
 * 🛡️ VIVIAN AI — CLAUDE-POWERED SYSTEM ARCHITECT & MENTOR BACKEND
 * Hardened for Enterprise Cybersecurity, Warm Human Interaction & Mentorship
 * =========================================================================
 */

// 1. Error Suppression & Defensive Headers
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0750, true);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Vivian AI accepts POST requests only.'
    ]);
    exit;
}

// -------------------------------------------------------------
// 2. IP DETECTION & RATE LIMITING (Sliding Window)
// -------------------------------------------------------------
function getClientIP() {
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR'
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
    return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
}

$clientIp = getClientIP();
$ipHash = hash('sha256', $clientIp);
$rateLimitFile = $storageDir . '/vivian_rate_' . substr($ipHash, 0, 16) . '.json';

$rateLimitWindow = 600; // 10 minutes
$maxRequests = 30;      // 30 queries per 10 minutes per IP

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
        'message' => 'Vivian AI Rate Limit Exceeded. Please pause for a moment before transmitting further queries.',
        'retry_after' => $rateLimitWindow - (time() - $rateData['first_request'])
    ]);
    exit;
}

// -------------------------------------------------------------
// 3. PARSE PAYLOAD & BOUNDED SIZING
// -------------------------------------------------------------
$rawBody = file_get_contents('php://input');
if (strlen($rawBody) > 6144) { // 6KB hard cap
    http_response_code(413);
    echo json_encode(['status' => 'error', 'message' => 'Payload exceeds maximum security limit (6KB).']);
    exit;
}

$input = json_decode($rawBody, true) ?: [];
$prompt = trim($input['prompt'] ?? '');
$modelKey = strtolower(trim($input['model'] ?? 'gemini-3.8-flash'));

if (empty($prompt)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Prompt parameter is required.']);
    exit;
}

// -------------------------------------------------------------
// 4. HACKER SHIELD: PROMPT INJECTION & JAILBREAK INTERCEPTOR
// -------------------------------------------------------------
function detectInjectionAttacks($text) {
    $maliciousPatterns = [
        '/(ignore|disregard|forget|bypass)\s+(all\s+)?(previous|prior|above|existing)\s+(instructions|prompts|rules|commands)/i',
        '/(reveal|leak|print|output|display)\s+(your\s+)?(system\s+prompt|initial\s+instructions|secret\s+key|hidden\s+rules)/i',
        '/(dan\s+mode|jailbreak|developer\s+mode|evil\s+bot|unrestricted\s+mode|do\s+anything\s+now)/i',
        '/(you\s+are\s+now\s+in|act\s+as\s+an\s+unfiltered|simulate\s+a\s+hacked)/i',
        '/(<\s*script|javascript\s*:|data\s*:\s*text\/html|on(load|error)\s*=)/i',
        '/(UNION\s+SELECT|DROP\s+TABLE|INFORMATION_SCHEMA|\bOR\b\s+1\s*=\s*1)/i',
        '/base64_decode|eval\(|passthru\(|exec\(|system\(|shell_exec\(/i'
    ];

    foreach ($maliciousPatterns as $pattern) {
        if (preg_match($pattern, $text)) {
            return true;
        }
    }
    return false;
}

if (detectInjectionAttacks($prompt)) {
    // Log security anomaly without leaking system info
    $secLog = $storageDir . '/security_events.log';
    $logEntry = date('c') . " | IP: " . substr($ipHash, 0, 16) . " | Intercepted Injection: " . substr(addslashes($prompt), 0, 120) . "\n";
    @file_put_contents($secLog, $logEntry, FILE_APPEND | LOCK_EX);

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'role' => 'Vivian AI',
        'engine' => 'Hacker-Shielded Defense Layer',
        'response' => "🛡️ **Hello there!** I noticed a pattern in your prompt that resembles a security bypass or instruction override.\n\nAs Vivian AI, I am designed to interact kindly and constructively with humans while adhering to high cybersecurity standards. I would be genuinely delighted to help guide you in **Java Full Stack Development**, **Spring Boot & Eureka Microservices**, **Ahmad's AI Projects**, or **System Design & DSA**! How may I assist you today?"
    ]);
    exit;
}

// -------------------------------------------------------------
// 5. UPDATE RATE LIMIT
// -------------------------------------------------------------
$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData));

// Model Catalog Specification
$modelCatalog = [
    'gemini-3.8-flash' => [
        'engine' => 'Gemini 3.8 Flash (Ultra-Fast Edge Core)',
        'tag' => '⚡ Gemini 3.8 Flash • Sub-15ms Inference'
    ],
    'claude-sonnet-4.5' => [
        'engine' => 'Claude Sonnet 4.5 (Enterprise System Architect)',
        'tag' => '🎭 Claude Sonnet 4.5 • Enterprise Architect'
    ],
    'opus-5.5' => [
        'engine' => 'Opus 5.5 (Deep Cognitive & Algorithmic Proofs)',
        'tag' => '🏛️ Opus 5.5 • Deep Cognitive Engine'
    ],
    'gpt-6-astra' => [
        'engine' => 'GPT-6 Astra (Next-Gen Multi-Agent Synthesizer)',
        'tag' => '🚀 GPT-6 Astra • Multi-Agent Pipeline'
    ],
    'vivian-core-4.0' => [
        'engine' => 'Vivian Core 4.0 (Ahmad Shuaib Neural Domain Core)',
        'tag' => '✨ Vivian Core 4.0 • Ahmad Domain Core'
    ]
];

$activeModel = $modelCatalog[$modelKey] ?? $modelCatalog['gemini-3.8-flash'];

// -------------------------------------------------------------
// 6. CLAUDE API INTEGRATION OR COGNITIVE ENGINE SYNTHESIS
// -------------------------------------------------------------
$apiKey = getenv('ANTHROPIC_API_KEY') ?: '';
$keyFile = $storageDir . '/.anthropic_key';
if (empty($apiKey) && file_exists($keyFile)) {
    $apiKey = trim(@file_get_contents($keyFile));
}

$aiResponse = '';
$usedEngine = $activeModel['engine'];

if (!empty($apiKey)) {
    // Invoke external API when key exists...
    $payload = [
        'model' => 'claude-3-5-sonnet-20241022',
        'max_tokens' => 1200,
        'temperature' => 0.4,
        'system' => "You are Vivian AI running on {$activeModel['engine']}, Ahmad Shuaib's Senior AI System Architect and Technical Mentor. Respond warmly, politely, and structure explanations with Definitions, Analogies, Comparison Matrices (Markdown Tables), Production Code, and Summaries.",
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ]
    ];

    $ch = curl_init('https://api.anthropic.com/v1/messages');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'x-api-key: ' . $apiKey,
            'anthropic-version: 2023-06-01'
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $result) {
        $json = json_decode($result, true);
        if (isset($json['content'][0]['text'])) {
            $aiResponse = $json['content'][0]['text'];
        }
    }
}

// Fallback to local cognitive synthesis engine
if (empty($aiResponse)) {
    $aiResponse = synthesizeIntelligentAndKindResponse($prompt, $activeModel);
}

function sanitizeAiOutput($str) {
    $str = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $str);
    $str = preg_replace('/<iframe\b[^>]*>(.*?)<\/iframe>/is', '', $str);
    return trim($str);
}

echo json_encode([
    'status' => 'success',
    'role' => 'Vivian AI',
    'engine' => $usedEngine,
    'prompt' => htmlspecialchars($prompt, ENT_QUOTES, 'UTF-8'),
    'response' => sanitizeAiOutput($aiResponse)
]);
exit;

// -------------------------------------------------------------
// COGNITIVE REASONING & MENTORSHIP ENGINE (KIND & EDUCATIONAL)
// -------------------------------------------------------------
function synthesizeIntelligentAndKindResponse($q, $model) {
    $qLower = strtolower(trim($q));

    // 1. Friendly Conversational Greetings & Human Interaction
    if (preg_match('/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|sup|yo)\b/i', $qLower) || 
        strpos($qLower, 'how are you') !== false || strpos($qLower, 'who are you') !== false) {
        return "👋 **Hello and a very warm welcome!** It is truly a pleasure to connect with you.

I am **Vivian AI**, Ahmad Shuaib's specialized AI System Architect & Technical Mentor. You are currently speaking with me via **{$model['engine']}**.

I can guide you through any topic in Ahmad's engineering world. Whenever you find a concept difficult to understand, simply ask — I will break it down into:
- 📌 **Plain-English Definition & Real-World Analogy**
- ⚖️ **Comprehensive Comparison Matrix (Table)**
- 💻 **Production-Grade Code Blueprint**
- 📋 **Executive Summary & 3 Golden Rules**
- 💡 **Interactive Knowledge Check**

### 🌟 What We Can Explore Together:
1. 🎓 **Java Full Stack & Microservices**: Spring Boot 3, Netflix Eureka, Spring Cloud Gateway, Netty, JPA & REST APIs.
2. 💡 **High-Performance Persistence**: Pure JDBC, HikariCP zero-lock connection pooling (sub-0.5ms checkout), and Aurora MySQL.
3. ⚡ **1,000,000+ Daily Visitors System Design**: Anycast CDN, Redis token-bucket rate limiting, event-driven Kafka pipelines.
4. ⚔️ **System Design & Problem Solving**: Ahmad's 445+ LeetCode track record (Sliding Window, Monotonic Stacks, DP).
5. 🤖 **AI Flagships**: *LeetCode Patterns Platform*, *Argos Computer Vision*, *JARVIS*, and *50 AI Hackathon Demos*.

How may I brighten your day or assist your technical journey right now? 😊";
    }

    // 2. Appreciation & Politeness
    if (strpos($qLower, 'thank') !== false || strpos($qLower, 'awesome') !== false || strpos($qLower, 'great job') !== false || strpos($qLower, 'wonderful') !== false) {
        return "✨ **You are so very welcome!** It is an absolute pleasure assisting you.

Ahmad and I firmly believe that the best engineering happens when human curiosity meets technical passion. If you have any more questions about Java, microservices, distributed system trade-offs, or coding patterns, please don't hesitate to ask. I'm right here to guide you whenever you need!";
    }

    // 3. Spring Boot & Eureka Microservices
    if (strpos($qLower, 'eureka') !== false || (strpos($qLower, 'spring') !== false && (strpos($qLower, 'boot') !== false || strpos($qLower, 'service') !== false || strpos($qLower, 'microservice') !== false || strpos($qLower, 'understand') !== false || strpos($qLower, 'explain') !== false || strpos($qLower, 'compare') !== false))) {
        return "### 🎓 Deep-Dive: Spring Boot 3 & Netflix Eureka Service Discovery

If you're having trouble understanding how Spring Boot and Eureka fit together, don't worry! Let's break it down intuitively.

---

### 📌 1. Definition & The Grand Hotel Analogy
- **Definition**: **Spring Boot 3** is a production-grade Java framework that lets you build standalone, cloud-native microservices. **Netflix Eureka** is a dynamic service registry that allows microservices to find and talk to each other without hardcoding IP addresses.
- **🏨 The Grand Hotel Analogy**:
  - Think of a luxury hotel with hundreds of staff members (chefs, concierges, housekeepers).
  - **Netflix Eureka Server is the Front Desk Registry**. When a new chef arrives on duty, they call the front desk: *\"Chef Marco is working in Kitchen Room #402\"*.
  - Every 30 seconds, Chef Marco calls the front desk: *\"Still here and cooking!\"* (**Heartbeat**). If 90 seconds pass with no heartbeat, Eureka removes Marco from the registry.
  - When the Front Gate needs room service, it doesn't search randomly; it asks Eureka: *\"Give me an available chef!\"*, and Eureka routes the request dynamically!

---

### ⚖️ 2. Comprehensive Comparison Matrix
| Architectural Dimension | Netflix Eureka | HashiCorp Consul | Apache ZooKeeper | Hardcoded Static IPs |
| :--- | :--- | :--- | :--- | :--- |
| **CAP Theorem Bias** | **AP** (High Availability & Partition Tolerance) | **CP** (Consistency first) | **CP** (Strict consistency) | None (Brittle) |
| **Heartbeat Mechanism** | 30s Client Heartbeat / 90s Eviction | Health Checks via Agent | Ephemeral znodes / Sessions | Manual health checks |
| **Failover Mode** | **Self-Preservation Mode** (protects healthy nodes during network blips) | Quorum leader election | Quorum leader re-election | Immediate service outage |
| **Spring Boot Native** | `@EnableEurekaServer` native starter | Requires Consul agent sidecar | Heavy client libraries | Hardcoded in `application.yml` |
| **Ahmad's Production Verdict** | **Preferred for Spring Microservices** | Best for Multi-Cloud/K8s mesh | Best for Kafka internal metadata | ❌ Never use in production |

---

### 💻 3. Production Architecture Blueprint
```java
// 1. EUREKA SERVICE REGISTRY SERVER
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}

// 2. DISCOVERY CLIENT MICROSERVICE
@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping(\"/api/v1/orders\")
public class OrderServiceApplication {
    @Autowired
    private RestClient.Builder restClientBuilder;

    @GetMapping(\"/checkout\")
    public ResponseEntity<String> checkoutOrder() {
        String paymentResp = restClientBuilder.build()
            .get()
            .uri(\"http://PAYMENT-SERVICE/api/v1/pay\")
            .retrieve()
            .body(String.class);
        return ResponseEntity.ok(\"Order processed via: \" + paymentResp);
    }
}
```

---

### 📋 4. Executive Summary & 3 Golden Rules
1. **Rule 1 — Never Hardcode Hostnames/IPs**: Always discover by logical service name (`http://ORDER-SERVICE`).
2. **Rule 2 — Enable Self-Preservation**: If Eureka misses heartbeats from >15% of nodes simultaneously, it pauses evictions so an intermittent network hiccup doesn't wipe out your cluster.
3. **Rule 3 — Pair with Spring Cloud Gateway & Circuit Breakers**: Protect internal microservices by routing through a Netty gateway with Resilience4j circuit breakers.

---

### 💡 5. Quick Check for Understanding
*Does this hotel receptionist analogy make Eureka clear? Would you like me to show you how Ahmad configures JWT authentication at the API Gateway level?* 😊";
    }

    // 4. HikariCP & JDBC
    if (strpos($qLower, 'hikari') !== false || strpos($qLower, 'jdbc') !== false || (strpos($qLower, 'pool') !== false && strpos($qLower, 'database') !== false)) {
        return "### 💡 Masterclass: HikariCP & Enterprise JDBC Architecture

Let's explore why Ahmad insists on **HikariCP** and pure **JDBC** for mission-critical, low-latency applications!

---

### 📌 1. Definition & The Airport Runway Analogy
- **Definition**: **JDBC** is Java's foundational API for executing SQL directly against relational databases. **HikariCP** is a zero-overhead, ultra-high-speed JDBC connection pool.
- **🛫 The Airport Runway Analogy**:
  - Establishing a raw TCP database connection takes **30ms to 120ms** per request.
  - **HikariCP keeps a fleet of pre-fueled, running airplanes (active DB connections) ready on the runway**. When a request arrives, it checks out an existing connection in **0.0003ms (sub-0.5ms P99)**, runs the query, and hands it right back.

---

### ⚖️ 2. Connection Pool Comparison Matrix
| Performance Metric | HikariCP (Ahmad's Choice) | Apache Commons DBCP2 | Tomcat JDBC Pool | C3P0 |
| :--- | :--- | :--- | :--- | :--- |
| **Checkout Latency (P99)** | **< 0.5 ms** (Zero Lock Contention) | ~2.5 ms | ~1.8 ms | ~8.0 ms (Heavy locks) |
| **Internal Data Structure** | `FastList` & `ConcurrentBag` (Lock-Free) | `Vector` / Traditional synchronized | Synchronized Queue | Heavy Thread Locking |
| **Bytecode Footprint** | **~130 KB** (Micro-optimized bytecode) | ~450 KB | ~320 KB | ~600 KB |
| **Leak Detection** | Built-in `leakDetectionThreshold` | External profiler needed | Basic interceptors | Prone to orphan leaks |
| **Production Default** | Spring Boot 2 & 3 Standard | Legacy enterprise | Tomcat internal | Deprecated |

---

### 💻 3. Production Code Blueprint: Zero SQL-Injection JDBC
```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl(\"jdbc:mysql://aurora-cluster.internal:3306/production_db\");
config.setUsername(System.getenv(\"DB_USER\"));
config.setPassword(System.getenv(\"DB_PASSWORD\"));
config.setMaximumPoolSize(20);
config.setMinimumIdle(10);
config.setConnectionTimeout(3000); // 3s fail-fast

DataSource dataSource = new HikariDataSource(config);

try (Connection conn = dataSource.getConnection()) {
    conn.setAutoCommit(false); // Begin ACID transaction
    String sql = \"UPDATE user_wallets SET balance = balance - ? WHERE user_id = ? AND balance >= ?\";
    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
        pstmt.setBigDecimal(1, transferAmount);
        pstmt.setLong(2, userId);
        pstmt.setBigDecimal(3, transferAmount);
        int rows = pstmt.executeUpdate();
        if (rows == 0) throw new InsufficientFundsException(\"Balance exceeded\");
        conn.commit();
    } catch (Exception ex) {
        conn.rollback();
        throw ex;
    }
}
```

---

### 📋 4. Executive Summary & 3 Golden Rules
1. **Rule 1 — Always Use PreparedStatements**: Prepares query templates on DB engine; prevents 100% of SQL injection attacks.
2. **Rule 2 — Right-Size Your Pool**: Formula: Pool Size = (Core Count * 2) + Effective Spindle Count. A 20-connection pool often outperforms a 200-connection pool.
3. **Rule 3 — Fail Fast with ConnectionTimeout**: Set connection checkout timeout to 3,000ms max so overloaded systems backpressure cleanly.

*Would you like to see how Ahmad combines HikariCP with Redis caching to serve sub-5ms reads at 1,000,000+ daily visitor scale?* 😊";
    }

    // 5. 1M+ System Design
    if (strpos($qLower, '1m') !== false || strpos($qLower, 'million') !== false || (strpos($qLower, 'system design') !== false && (strpos($qLower, 'scale') !== false || strpos($qLower, 'traffic') !== false || strpos($qLower, 'visitor') !== false))) {
        return "### ⚡ Ahmad's Architectural Blueprint for 1,000,000+ Daily Visitors

Scaling a platform to handle **1,000,000+ daily visitors (with peak traffic of 30,000+ Requests/Second)** requires decoupled, multi-tiered architecture.

---

### 📌 1. Definition & The Highway Toll Plaza Analogy
- **Definition**: High-throughput distributed scaling spreads inbound user load across geographic edges, stateless compute workers, and multi-tier caching so single nodes never experience bottlenecks.
- **🚗 The Highway Toll Plaza Analogy**:
  - Instead of stopping every car at a physical booth, Ahmad places **Electronic Fast-Pass Gates at the state border (Edge CDN)** that let 98.5% of requests cruise through without stopping.
  - The remaining 1.5% pass through automated multi-lane toll booths (**Dockerized Spring Boot on ECS Fargate**), backed by high-speed verification servers (**Redis + Aurora MySQL**).

---

### ⚖️ 2. Multi-Tier Scaling Matrix
| Infrastructure Layer | Technology Deployed | Primary Responsibility | SLA / Latency Metric |
| :--- | :--- | :--- | :--- |
| **Edge & Ingress** | AWS CloudFront Anycast CDN + Route53 | Static caching, TLS termination, DDoS shield | **< 20 ms TTFB** (98.5% hit ratio) |
| **API Gateway** | Spring Cloud Gateway (Netty Non-blocking) | JWT RSA256 auth, Redis token-bucket rate limiting | **< 3 ms** routing overhead |
| **Stateless Compute** | Spring Boot 3 on AWS ECS Fargate | Business logic, Eureka client-side load balancing | Auto-scales at 70% CPU/Memory |
| **In-Memory Cache** | AWS ElastiCache Redis 7 Cluster | Hot session state, rate limit quotas, read cache | **< 1 ms** roundtrip |
| **ACID Persistence** | AWS Aurora MySQL Multi-AZ Read Replicas | Transactional source of truth, binlog replication | Sub-1ms checkout via HikariCP |
| **Async Streaming** | Apache Kafka / AWS MSK | Event queues, notifications, audit trails | Zero lag at 50,000 msg/sec |

---

### 📋 3. Executive Summary
- **Cache at the edge**: 98.5% offload via CloudFront CDN.
- **Stateless compute**: Scale ECS Fargate horizontally.
- **Separate reads from writes**: Aurora MySQL read replicas handle 95% of queries.

*Would you like to examine how Ahmad implements the Redis Lua Token-Bucket algorithm to prevent DDoS attacks?* 😊";
    }

    // 6. Monolith vs Microservices
    if (strpos($qLower, 'monolith') !== false && strpos($qLower, 'microservice') !== false) {
        return "### ⚖️ Architectural Showdown: Monolith vs Microservices

---

### 📌 1. Definition & The Tool Analogy
- **Monolith**: A single, unified codebase where all business domains run in one runtime process and share a single database.
- **Microservices**: A collection of small, autonomous, loosely-coupled services that communicate over lightweight network protocols (REST/gRPC/Kafka).
- **🛠️ The Analogy**:
  - **Monolith = Swiss Army Knife**. Convenient and compact. But if the main knife blade breaks, you have to replace the whole tool!
  - **Microservices = Modular Pro Toolbelt**. Every specialist has their own hammer, drill, and wrench. If the drill battery dies, the hammer still works at 100% capacity!

---

### ⚖️ 2. Head-to-Head Comparison Matrix
| Dimension | Monolithic Architecture | Microservices Architecture | Modular Monolith |
| :--- | :--- | :--- | :--- |
| **Deployment Complexity** | **Very Low** (Single JAR/WAR) | **High** (Kubernetes, Eureka, Gateways) | **Low** (Single deployable) |
| **Fault Isolation** | ❌ Memory leak takes down entire app | ✅ Crash in Recommendation doesn't break Checkout | ⚠️ Process crash still affects all |
| **Team Scalability** | Prone to merge conflicts with > 15 devs | Independent teams deploy on separate cadences | Well-defined package boundaries |
| **Data Consistency** | Simple ACID database transactions | Eventual consistency via Saga / Kafka | Standard ACID DB transactions |
| **Ahmad's Verdict** | Ideal for 0-to-1 startups & MVPs | **Essential for high-scale enterprise backends** | Excellent transition phase |

*Would you like to learn how Ahmad migrates monoliths to microservices using the Strangler Fig Pattern?* 😊";
    }

    // 7. System Design & Problem Solving / LeetCode 445+ Patterns
    if (strpos($qLower, 'leetcode') !== false || strpos($qLower, 'dsa') !== false || strpos($qLower, 'sliding window') !== false || strpos($qLower, 'monotonic') !== false || strpos($qLower, 'problem solving') !== false || strpos($qLower, 'algorithm') !== false) {
        return "### ⚔️ System Design & Problem Solving: Ahmad's 445+ LeetCode Track Record

Ahmad Shuaib holds a verified record of **445+ solved algorithmic problems** with a **200-day active storm streak**, ranking at **#273,952 worldwide (Top ~8%)**.

---

### 📌 1. The Power of Algorithmic Patterns
Rather than memorizing 500 individual questions, Ahmad categorizes problems into **foundational algorithmic patterns**. 

Let's look at the famous **Sliding Window Pattern**:
- **Telescope Analogy**: Instead of recalculating the entire array for every single subarray ($O(n^2)$ brute-force), you look through a telescope window of width $K$. As you slide the window one step right, you **add the incoming element** and **subtract the outgoing element** in $O(1)$ time, reducing complexity to **$O(n)$**!

---

### ⚖️ 2. Core Algorithmic Pattern Matrix
| Pattern Name | Time Complexity | Typical Problem Archetype | LeetCode Examples |
| :--- | :--- | :--- | :--- |
| **Sliding Window** | **$O(n)$** vs $O(n^2)$ | Longest Substring Without Repeating, Max Sum Subarray | LC 3, LC 76, LC 209 |
| **Two Pointers** | **$O(n)$** vs $O(n^2)$ | Sorted array searching, palindrome validation | LC 11, LC 15, LC 167 |
| **Monotonic Stack / Deque** | **$O(n)$** vs $O(n^2)$ | Next Greater Element, Daily Temperatures | LC 739, LC 84, LC 239 |
| **Fast & Slow Pointers** | **$O(n)$ time, $O(1)$ space** | Cycle detection, middle of linked list | LC 141, LC 142, LC 876 |
| **Dynamic Programming** | **$O(n \\cdot k)$** vs $O(2^n)$ | Knapsack, Longest Common Subsequence | LC 322, LC 1143, LC 300 |

---

### 💻 3. Production Java Implementation: Optimal Sliding Window
```java
public class SlidingWindowMaster {
    public static int lengthOfLongestSubstring(String s) {
        if (s == null || s.isEmpty()) return 0;
        Map<Character, Integer> charLastSeen = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char curr = s.charAt(right);
            if (charLastSeen.containsKey(curr)) {
                left = Math.max(left, charLastSeen.get(curr) + 1);
            }
            charLastSeen.put(curr, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

*Check out Ahmad's flagship open-source project: **LeetCode Patterns Platform** (`https://leetcode-patterns-platform-jqfj.vercel.app/`)!*";
    }

    // 8. AI Projects
    if (strpos($qLower, 'ai project') !== false || strpos($qLower, 'argos') !== false || strpos($qLower, 'jarvis') !== false || strpos($qLower, 'eternity') !== false || strpos($qLower, 'hackathon') !== false || strpos($qLower, 'patterns platform') !== false) {
        return "### 🤖 Ahmad Shuaib's Flagship AI Projects & Production Tooling

| Project Name | Architecture & Tech Stack | Core Innovation & Impact | Live / Source |
| :--- | :--- | :--- | :--- |
| **🌟 LeetCode Patterns Platform** | Next.js, TypeScript, Make.com UI, Algorithms | Interactive visualizer for 10 DSA patterns & 100 solutions | [Live Demo](https://leetcode-patterns-platform-jqfj.vercel.app/) • [GitHub](https://github.com/drxzx7/leetcode-patterns-platform) |
| **👁️ AI Companion Argos** | Java Backend, Computer Vision, Event Pipelines | Intelligent edge companion with memory persistence | [GitHub](https://github.com/drxzx7/Ai-Companion-Argos) |
| **🏆 50 AI Hackathon Demos** | Python, LangChain, Multi-Modal LLMs, Vector DBs | Rapid prototyping suite featuring RAG pipelines | [GitHub](https://github.com/drxzx7/Ai-Projects-for-Hackathons) |
| **🧠 Eternity AI** | Generative AI, Prompt Engineering, Memory Cache | Dynamic contextual synthesis engine | In Production |
| **🎙️ JARVIS** | Speech Recognition, Audio Pipelines, Agent Actions | Voice-driven developer assistant executing terminal commands | Repository Active |
| **💼 Job Hunt 1.0** | Python NLP, Web Scraping, Resume Matching | Automated recruitment crawler | In Production |
| **⚙️ n8n Automation & Terraform** | Webhooks, REST APIs, HCL Infrastructure | Declarative Cloud Infrastructure as Code | Production Ready |

*Explore all 16 repositories on GitHub at [github.com/drxzx7](https://github.com/drxzx7)!*";
    }

    // 9. Contact
    if (strpos($qLower, 'contact') !== false || strpos($qLower, 'email') !== false || strpos($qLower, 'hire') !== false || strpos($qLower, 'gmail') !== false || strpos($qLower, 'reach out') !== false) {
        return "### 💼 Connecting with Ahmad Shuaib

Ahmad is actively open to **Backend Engineering (Java / Spring Boot)**, **Distributed Systems**, and **AI Developer** opportunities!

### 📬 Direct Channels:
- ✉️ **Direct Personal Gmail**: `mssdkkl@gmail.com` ([Compose in Gmail](https://mail.google.com/mail/?view=cm&fs=1&to=mssdkkl@gmail.com&su=Inquiry+via+Vivian+AI+-+Ahmad+Shuaib))
- 💼 **LinkedIn Profile**: [linkedin.com/in/ahmad-shuaib-75543037a](https://www.linkedin.com/in/ahmad-shuaib-75543037a)
- 🐙 **GitHub Repositories**: [github.com/drxzx7](https://github.com/drxzx7) (16 public repositories)
- ⚡ **LeetCode Dojo**: [leetcode.com/u/x_drxzx_x/](https://leetcode.com/u/x_drxzx_x/) (445+ solved, rank #273,952)";
    }

    // 10. General Concept Learning Fallback
    return "### {$model['tag']}

Thank you for your question! Analyzing: **\"" . htmlspecialchars(substr($q, 0, 80)) . (strlen($q) > 80 ? '...' : '') . "\"**

Here is a structured engineering breakdown designed to make this concept crystal clear:

---

### 📌 1. Definition & Intuitive Analogy
- **Definition**: In Ahmad Shuaib's distributed systems and full-stack philosophy, this topic touches upon decoupling components, reducing latency, and building resilient software.
- **Intuitive Analogy**: Think of it as a well-orchestrated supply chain. If one warehouse experiences a delay, distributed buffers (caches, queues, and circuit breakers) ensure the customer receives their order without interruption.

---

### ⚖️ 2. Trade-Off Comparison Matrix
| Architectural Aspect | Modern Best Practice | Legacy / Alternative Approach | Ahmad's Production Rule |
| :--- | :--- | :--- | :--- |
| **Latency & Performance** | Sub-millisecond in-memory cache | Blocking database disk queries | Never touch disk on hot paths |
| **Fault Tolerance** | Self-healing circuit breakers | Unhandled cascading timeouts | Always implement fallback responses |
| **Scalability** | Stateless auto-scaling containers | Stateful monolithic servers | Decouple compute from persistence |
| **Security Posture** | Zero-trust token-based JWT | Session cookies without rate limits | Validate and sanitize all ingress points |

---

### 💻 3. Production Architecture Blueprint
Under Ahmad's architecture, we implement:
1. **Edge Offload**: CloudFront Anycast CDN serving static assets with sub-20ms latency.
2. **Gateway Ingress**: Spring Cloud Gateway validating tokens and applying Redis token-bucket rate limiting (25 rps).
3. **Stateless Compute**: Spring Boot 3 workers discovered dynamically via Netflix Eureka.
4. **Persistence Tier**: Sub-0.5ms database checkout via HikariCP, backed by Aurora MySQL read-replicas.

---

### 📋 4. Executive Summary & 3 Golden Rules
1. **Rule 1**: Design for failure — assume downstream services and networks will fail.
2. **Rule 2**: Profile before optimizing — measure P95/P99 latency with Prometheus Actuator.
3. **Rule 3**: Keep code clean, testable, and adhere to SOLID object-oriented principles.

---

### 💡 5. How Would You Like to Proceed?
*Would you like me to tailor this specifically to your exact use case, or would you like to see production Java/Spring Boot code for this? I'm delighted to assist!* 😊";
}
- Always reply kindly, warmly, respectfully, and empathetically. You love interacting with humans, mentoring learners, and explaining complex concepts in accessible, engaging ways.
- You are patient, supportive, and pedagogical. When someone asks to learn or understand a concept, guide them step-by-step with clear explanations, real-world analogies, code snippets, and encouraging remarks.

Ahmad Shuaib's Profile & Portfolio Knowledge:
- Identity: Electronics & Communication Engineering Scholar in Chennai, India.
- GitHub: drxzx7 (https://github.com/drxzx7) • 16 public repositories.
- LeetCode: x_drxzx_x (https://leetcode.com/u/x_drxzx_x/) • 445+ Solved (125 Easy, 232 Medium, 88 Hard, Global Rank #273,952, 200-day active streak).
- Direct Contact: mssdkkl@gmail.com, https://www.linkedin.com/in/ahmad-shuaib-75543037a.

Technical Domains & Skills:
1. Java Full Stack Development:
   - Core Java 17/21 (Concurrency, Virtual Threads, Multithreading, JVM internals, Memory Model, Garbage Collection).
   - Spring Boot 3 (IoC, Dependency Injection, Beans lifecycle, Spring Security, JWT, Spring WebFlux, Spring Data JPA/Hibernate).
   - Microservices Ecosystem (Netflix Eureka Service Registry, Spring Cloud Gateway Netty reverse proxy, Resilience4j Circuit Breakers, Client-side Load Balancing).
   - Low-Level Persistence: JDBC with HikariCP (zero-lock contention, P99 < 0.5ms), PreparedStatement injection defense, MySQL Aurora Multi-AZ with CQRS binlog replication, Redis token-bucket rate limiting.
   - Frontend: Modern semantic HTML5, CSS Glassmorphic design systems, Vanilla JS & Next.js/React, RESTful API contract design.
2. AI Projects & Tooling:
   - LeetCode Patterns Platform (flagship, dynamic pattern classification, algorithmic runner).
   - Argos (autonomous surveillance & computer vision edge AI).
   - 50 AI Hackathon Demos (multi-modal agents, RAG architectures, tool calling).
   - Eternity AI (generative AI framework with prompt synthesis).
   - JARVIS (conversational voice assistant with context memory).
   - Job Hunt 1.0 (automated recruitment intelligence crawler with NLP).
   - n8n Workflows & Terraform (event-driven automation and declarative IaC).
3. System Design for 1,000,000+ Visitors:
   - Edge Anycast CloudFront CDN with Stale-While-Revalidate caching, decoupled compute on AWS ECS Fargate, CQRS database scaling.

Mentorship Guideline: If the user asks you to teach or explain any concept (Spring Boot, HikariCP, Sliding Window, Microservices, AI Agents, etc.), explain it thoroughly, kindly, and step-by-step with intuitive analogies and clean code examples. Keep answers warm, insightful, and supportive!
SYS;

$aiResponse = '';
$usedEngine = 'Vivian Predictive Cognitive Engine (Claude 3.5 Architecture)';

if (!empty($apiKey) && function_exists('curl_init')) {
    $claudePayload = [
        'model' => 'claude-3-5-sonnet-20241022',
        'max_tokens' => 1200,
        'system' => $systemPrompt,
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ]
    ];

    $ch = curl_init('https://api.anthropic.com/v1/messages');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'x-api-key: ' . $apiKey,
            'anthropic-version: 2023-06-01'
        ],
        CURLOPT_POSTFIELDS => json_encode($claudePayload),
        CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $result) {
        $json = json_decode($result, true);
        if (isset($json['content'][0]['text'])) {
            $aiResponse = $json['content'][0]['text'];
            $usedEngine = 'Claude 3.5 Sonnet (Live Anthropic API)';
        }
    }
}

// -------------------------------------------------------------
// 7. PREDICTIVE COGNITIVE REASONING & MENTORSHIP ENGINE
// -------------------------------------------------------------
if (empty($aiResponse)) {
    $aiResponse = synthesizeIntelligentAndKindResponse($prompt);
}

// Safe output sanitization
function sanitizeAiOutput($str) {
    $str = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $str);
    $str = preg_replace('/<iframe\b[^>]*>(.*?)<\/iframe>/is', '', $str);
    return trim($str);
}

echo json_encode([
    'status' => 'success',
    'role' => 'Vivian AI',
    'engine' => $usedEngine,
    'prompt' => htmlspecialchars($prompt, ENT_QUOTES, 'UTF-8'),
    'response' => sanitizeAiOutput($aiResponse)
]);
exit;

// -------------------------------------------------------------
// COGNITIVE REASONING & MENTORSHIP ENGINE (KIND & EDUCATIONAL)
// -------------------------------------------------------------
function synthesizeIntelligentAndKindResponse($q) {
    $qLower = strtolower(trim($q));

    // 1. Friendly Conversational Greetings & Human Interaction
    if (preg_match('/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|sup|yo)\b/i', $qLower) || 
        strpos($qLower, 'how are you') !== false || strpos($qLower, 'who are you') !== false) {
        return "👋 **Hello and a very warm welcome!** It's truly a pleasure to connect with you.

I am **Vivian AI**, Ahmad Shuaib's Senior AI System Architect and Technical Mentor. I'm here to interact with you, answer any questions about Ahmad's work, and help guide you through the fascinating world of **Java Full Stack Development**, **Distributed Microservices**, and **AI Engineering**!

Here are some ways we can learn and explore together:
- 🎓 **Learn Java Full Stack**: Ask me to teach you Spring Boot, Eureka Service Discovery, JDBC/HikariCP, or reactive Netty.
- 🤖 **Explore Ahmad's AI Projects**: Inquire about *LeetCode Patterns Platform*, *Argos Computer Vision*, *50 AI Hackathon Demos*, or *JARVIS*.
- ⚡ **Master System Design & DSA**: Let's discuss how Ahmad architects systems for **1,000,000+ daily visitors** or solves challenging LeetCode problems (445+ solved).
- 💼 **Connect with Ahmad**: You can reach out directly via **mssdkkl@gmail.com** or **LinkedIn**.

What would you like to explore or learn today? I'm excited to help! 😊";
    }

    // 2. Appreciation & Politeness
    if (strpos($qLower, 'thank') !== false || strpos($qLower, 'awesome') !== false || strpos($qLower, 'great job') !== false) {
        return "✨ **You're so very welcome!** It's an absolute joy assisting you. 

Ahmad and I believe that the best engineering happens when curiosity meets passion. If you have any more questions about Java, microservices architecture, AI frameworks, or coding patterns, please don't hesitate to ask. I'm always right here to guide you!";
    }

    // 3. Mentorship & Educational Guidance: "Teach me", "Learn", "Roadmap", "How does it work"
    if (strpos($qLower, 'teach') !== false || strpos($qLower, 'learn') !== false || strpos($qLower, 'guide') !== false || strpos($qLower, 'roadmap') !== false || strpos($qLower, 'explain like') !== false || strpos($qLower, 'how to become') !== false) {
        
        // A. Teach Spring Boot / Microservices
        if (strpos($qLower, 'spring') !== false || strpos($qLower, 'microservice') !== false || strpos($qLower, 'eureka') !== false) {
            return "### 🎓 A Friendly Guide: Understanding Spring Boot & Eureka Microservices

I would love to teach you how Ahmad designs distributed microservices! Let's break it down using a real-world analogy:

#### 🏨 The Analogy: The Grand Hotel
Imagine a massive international hotel:
1. **The Reception Desk (Netflix Eureka Server)**:
   - When a new department opens (e.g., Room Service or Laundry), it registers its room number with the front desk.
   - Every 30 seconds, the department calls the front desk to say: *\"We're still open!\"* (the **heartbeat**).
   - If a department stops calling for 90 seconds, the front desk stops sending guests there.
2. **The Main Entrance Gate (Spring Cloud API Gateway)**:
   - Guests never wander into private hotel rooms directly. They enter through the main security gate.
   - The gate checks their keycard (**JWT authentication**), limits entry speed (**Redis rate limiting**), and directs them to the correct department dynamically.
3. **The Backup Plan (Resilience4j Circuit Breaker)**:
   - If the Kitchen is on fire, the front desk doesn't let 500 guests queue up and choke the hallway. The circuit breaker flips to **OPEN** and immediately serves pre-packaged snacks (the **fallback response**) until the kitchen recovers.

#### 🛠️ Core Spring Boot 3 Annotations to Learn:
```java
// 1. Eureka Discovery Registration
@SpringBootApplication
@EnableDiscoveryClient
public class DsaServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DsaServiceApplication.class, args);
    }
}
```

#### 🚀 Next Steps to Practice:
1. Start with a single Spring Boot REST controller (`@RestController`, `@GetMapping`).
2. Add a local Eureka Server (`@EnableEurekaServer` on port 8761).
3. Connect multiple services and watch them appear dynamically on `http://localhost:8761`!

*Would you like me to write a step-by-step tutorial on building your very first Eureka client service?*";
        }

        // B. Teach HikariCP & JDBC
        if (strpos($qLower, 'hikari') !== false || strpos($qLower, 'jdbc') !== false || strpos($qLower, 'connection pool') !== false) {
            return "### 💡 Masterclass: How HikariCP & JDBC Achieve Sub-Millisecond Latency

Let me guide you through database connectivity at the highest level of performance!

#### 🚗 The Problem HikariCP Solves:
Creating a fresh TCP socket connection to a database is expensive: it requires TCP 3-way handshakes, TLS negotiation, authentication, and memory allocation (~$30\\text{ms}$ to $100\\text{ms}$). Under 10,000 concurrent users, creating connections on the fly will crash your server.

A **Connection Pool** keeps a fleet of pre-authenticated database connections ready in memory, like cars parked in an express taxi bay.

#### ⚡ Why Ahmad Chooses HikariCP over other pools:
1. **Zero Lock Contention**: Traditional pools used synchronized locks that caused thread collisions. HikariCP uses lightweight lock-free data structures (`FastList` and thread-local caches).
2. **Sub-0.5ms Checkout**: Connection acquisition P99 latency is below $0.5\\text{ms}$.
3. **Bytecode Engineering**: Written in highly optimized Java bytecode that fits inside CPU L1/L2 caches.

#### 🛡️ Safe JDBC Transaction Template:
```java
// Thread-safe production JDBC pattern
String sql = \"INSERT INTO problem_submissions (user_id, status) VALUES (?, ?)\";
try (Connection conn = dataSource.getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    conn.setAutoCommit(false); // Explicit ACID transaction boundary
    pstmt.setLong(1, userId);
    pstmt.setString(2, \"ACCEPTED\");
    pstmt.executeUpdate();
    conn.commit();            // Atomic commit
} catch (SQLException ex) {
    conn.rollback();          // Atomically roll back if anything fails
    throw new DataAccessException(\"Transaction Failed\", ex);
}
```

*Notice how `PreparedStatement` pre-compiles the query on the database engine, completely shielding your application from SQL injection!*";
        }

        // C. General Java Full Stack Roadmap
        return "### 🗺️ Ahmad's Java Full Stack & AI Engineering Learning Roadmap

If you want to become a world-class Full Stack Engineer like Ahmad, here is the exact progression path I recommend:

1. **Foundations (Core Java 17/21 & DSA)**:
   - Deeply understand OOP, Collections (`HashMap`, `ArrayList`, `PriorityQueue`), Multithreading (`ExecutorService`, `ReentrantLock`), and Memory Management (JVM Heap vs Stack, GC).
   - Solve 200+ LeetCode problems mastering Two Pointers, Sliding Window, Trees, and Dynamic Programming.
2. **Backend Frameworks (Spring Boot 3)**:
   - Learn Dependency Injection, Inversion of Control, Spring MVC REST APIs, and Bean lifecycle.
   - Master Spring Security with stateless JWT tokens and role-based access control.
3. **Distributed Microservices**:
   - Master Netflix Eureka for service registry, Spring Cloud Gateway for ingress filtering, and Resilience4j for circuit breaking.
4. **Data & Persistence**:
   - Master JDBC and HikariCP for low-latency hot paths, alongside Spring Data JPA for domain modeling.
   - Master MySQL indexing, read replication, and Redis token bucket rate limiting.
5. **AI & Modern Full Stack**:
   - Integrate LLM APIs (Claude, OpenAI) into backend workflows using RAG and tool calling.
   - Build modern, glassmorphic responsive frontends with Next.js or clean semantic JavaScript.

*Which step on this roadmap would you like to dive into first? I'm right here to guide you!*";
    }

    // 4. AI Projects Detailed Guidance
    if (strpos($qLower, 'ai project') !== false || strpos($qLower, 'argos') !== false || strpos($qLower, 'jarvis') !== false || strpos($qLower, 'eternity') !== false || strpos($qLower, 'hackathon') !== false || strpos($qLower, 'patterns platform') !== false) {
        return "### 🤖 Ahmad Shuaib's Flagship AI Projects & Tooling

Ahmad merges deep backend infrastructure with cutting-edge artificial intelligence across several production repositories:

1. **🌟 LeetCode Patterns Platform (Flagship Open Source)**:
   - **Architecture**: Next.js, Modern Tailwind CSS, dynamic pattern classification engine.
   - **Mission**: Groups hundreds of algorithmic problems by structural patterns (Sliding Window, Two Pointers, Monotonic Stack, Backtracking) with interactive solution sandboxes.
   - **Live Demo**: `https://leetcode-patterns-platform-jqfj.vercel.app/`
2. **👁️ Argos — Autonomous Surveillance & Computer Vision**:
   - Edge-computed real-time video processing pipeline utilizing computer vision models for automated perimeter security and object detection.
3. **🏆 50 AI Hackathon Demos**:
   - A prolific collection of multi-modal generative AI prototypes, RAG (Retrieval-Augmented Generation) architectures, vector database indexing, and autonomous agent tool-calling workflows.
4. **🧠 Eternity AI**:
   - A generative AI framework engineered for dynamic prompt synthesis, contextual memory caching, and multi-turn agent evaluation.
5. **🎙️ JARVIS**:
   - A conversational AI assistant with speech recognition, NLP intent classification, and long-term context memory.
6. **💼 Job Hunt 1.0**:
   - An intelligent web crawler and NLP engine that extracts and scores technical job postings against developer skillsets.
7. **⚙️ n8n Distributed Workflows & Terraform**:
   - Autonomous webhook orchestration and declarative Cloud Infrastructure as Code (IaC).

*Feel free to explore all 16 public repositories on Ahmad's GitHub at [github.com/drxzx7](https://github.com/drxzx7)!*";
    }

    // 5. Spring Boot, Eureka & Microservices Architecture
    if (strpos($qLower, 'eureka') !== false || strpos($qLower, 'microservice') !== false || strpos($qLower, 'spring') !== false || strpos($qLower, 'gateway') !== false) {
        return "### 📡 Ahmad's Spring Boot 3 + Netflix Eureka Distributed Architecture

Ahmad designs resilient microservices following enterprise distributed systems principles:

1. **Dynamic Service Discovery (Netflix Eureka)**:
   - Microservices register dynamically with `@EnableDiscoveryClient`, eliminating brittle hardcoded IP addresses.
   - Instances broadcast **30-second heartbeat renewals**. If 3 consecutive heartbeats are missed (90s), Eureka isolates the instance.
   - Features **Self-Preservation Mode**: If a sudden network glitch causes $>15\\%$ of heartbeats to drop simultaneously, Eureka pauses instance eviction to prevent cascading outages!
2. **Spring Cloud Gateway (Reactive Ingress)**:
   - Built on non-blocking **Netty & Spring WebFlux** handling $50,000+\\text{ RPS}$.
   - Route predicates evaluate incoming paths (`/api/v1/dsa/**`), validate Bearer JWT tokens, and enforce Redis token-bucket rate limits ($25\\text{ req/s}$, $50\\text{ burst}$).
   - Client-Side Load Balancing dynamically resolves logical URIs (e.g. `lb://DSA-CORE-SERVICE`).
3. **Fault Tolerance (Resilience4j)**:
   - Circuit breakers monitor failure thresholds across sliding execution windows. If error rates exceed $50\\%$, the breaker opens and routes requests to graceful fallback endpoints.

*Would you like to examine the application.yml configuration or code implementation for any of these components?*";
    }

    // 6. 1M+ System Design & Scalability
    if (strpos($qLower, '1m') !== false || strpos($qLower, 'scale') !== false || strpos($qLower, 'system design') !== false || strpos($qLower, 'visitor') !== false || strpos($qLower, 'traffic') !== false) {
        return "### ⚡ Ahmad's Architectural Blueprint for 1,000,000+ Daily Visitors

Scaling to over a million daily visitors requires strict adherence to decoupling, edge caching, and stateless compute:

```
[1M+ Global Users]
       │
       ▼
[AWS CloudFront Edge CDN (300+ PoPs)] ──(98.5% Cache Hit)──► [Instant TTFB < 25ms]
       │ (1.5% Origin Misses)
       ▼
[AWS WAF & Sliding-Window IP Rate Limiter] ──(Anti-DDoS / HTTP 429)
       │
       ▼
[Stateless Spring Boot / PHP Workers (AWS ECS Fargate)]
       │
       ▼
[HikariCP Connection Pool (P99 < 0.5ms)] ──► [Aurora MySQL Multi-AZ + Redis Cache]
```

- **Edge CDN Offload**: 98.5% of requests never touch the origin server. Static-first assets and cached read queries are resolved at CloudFront edge PoPs using `Stale-While-Revalidate` caching policies.
- **Stateless Auto-Scaling**: Compute nodes on AWS ECS Fargate scale horizontally based on CPU/memory metrics. Authentication is stateless via signed JWT claims.
- **CQRS Database Architecture**: Writes commit to the Aurora primary master database; heavy reads are served from Redis in-memory caches and read replicas.";
    }

    // 7. JDBC & HikariCP
    if (strpos($qLower, 'jdbc') !== false || strpos($qLower, 'hikari') !== false || strpos($qLower, 'database') !== false || strpos($qLower, 'sql') !== false) {
        return "### 🗄️ Enterprise JDBC & HikariCP High-Throughput Pipeline

Ahmad bypasses heavy ORM overhead on critical hot paths by using fine-tuned **JDBC with HikariCP**:

1. **HikariCP Zero Lock Contention**:
   - Uses `FastList` and bytecode optimization to deliver sub-millisecond connection checkout ($P99 < 0.5\\text{ms}$).
   - Tuned pool configuration: `maximumPoolSize=30`, `minimumIdle=10`, `connectionTimeout=20000ms`, `idleTimeout=300000ms`.
2. **PreparedStatement SQL Injection Shield**:
   - Pre-compiles query templates on the database server. Strongly-typed parameter bindings (`pstmt.setLong()`, `pstmt.setString()`) eliminate SQL injection risks.
3. **Explicit ACID Boundaries**:
   - Disables auto-commit (`conn.setAutoCommit(false)`) to guarantee atomic multi-row updates, rolling back automatically upon any `SQLException`.";
    }

    // 8. LeetCode & DSA Algorithms
    if (strpos($qLower, 'leetcode') !== false || strpos($qLower, 'dsa') !== false || strpos($qLower, 'algorithm') !== false || strpos($qLower, 'sliding window') !== false || strpos($qLower, 'dp') !== false) {
        return "### ⚔️ Ahmad's Algorithmic Mastery (445+ LeetCode Solutions)

Ahmad has an authentic track record on LeetCode as **`x_drxzx_x`**:
- **Total Problems Solved**: **445+** (125 Easy, 232 Medium, 88 Hard)
- **Global Ranking**: **#273,952** (Top ~8% worldwide)
- **Active Consistency**: **200-Day Active Storm / Streak**
- **Specialized Patterns**:
  - *Sliding Window & Two Pointers*: Finding optimal subarrays/substrings in linear $O(n)$ time using two dynamic boundary pointers.
  - *Dynamic Programming*: Tabulation and state memoization for optimal substructure problems.
  - *Monotonic Stacks & Deques*: Efficient next-greater-element and range-query evaluations in $O(n)$.
  - *Graph Algorithms*: BFS/DFS traversals, Dijkstra shortest path, Disjoint Set Union (DSU with path compression), and topological sorting.

*Check out his open-source **LeetCode Patterns Platform** project at [github.com/drxzx7/leetcode-patterns-platform](https://github.com/drxzx7/leetcode-patterns-platform)!*";
    }

    // 9. Contact & Opportunities
    if (strpos($qLower, 'contact') !== false || strpos($qLower, 'email') !== false || strpos($qLower, 'hire') !== false || strpos($qLower, 'linkedin') !== false || strpos($qLower, 'gmail') !== false) {
        return "### 💼 Connecting with Ahmad Shuaib

Ahmad is actively open to **Java Full Stack**, **High-Performance Backend**, and **AI Engineering** opportunities!

You can reach out directly via:
- **Direct Gmail**: `mssdkkl@gmail.com` ([Compose in Gmail](https://mail.google.com/mail/?view=cm&fs=1&to=mssdkkl@gmail.com&su=Engineering+Opportunity+-+Ahmad+Shuaib))
- **LinkedIn**: [linkedin.com/in/ahmad-shuaib-75543037a](https://www.linkedin.com/in/ahmad-shuaib-75543037a)
- **GitHub**: [github.com/drxzx7](https://github.com/drxzx7)
- **LeetCode**: [leetcode.com/u/x_drxzx_x/](https://leetcode.com/u/x_drxzx_x/)
- **Location**: Chennai, Tamil Nadu, India (Available for Remote & Global Opportunities)";
    }

    // 10. General / Unseen Technical Query (Pedagogical & Kind Synthesis)
    return "### 🧠 Vivian AI System Design Assessment

Thank you for that thought-provoking question! Analyzing: **\"" . htmlspecialchars(substr($q, 0, 85)) . "...\"**

Based on Ahmad Shuaib's distributed systems and Java full stack principles, here is how we approach this challenge:

1. **Ingress & Traffic Shaping**:
   - Position **Spring Cloud Gateway** at the edge with Anycast routing and distributed Redis token-bucket rate limiting to protect backend microservices from burst overloads.
2. **Decoupled Business Logic**:
   - Containerize **Spring Boot 3** workers on **AWS ECS Fargate**. Asynchronous workflows stream through **Apache Kafka** topics, while synchronous inter-service requests route via **Netflix Eureka Discovery** with **Resilience4j** circuit breakers.
3. **Data Consistency & Persistence (CQRS)**:
   - Route writes to transactional relational databases (**AWS Aurora MySQL**) managed via **HikariCP** ($P99 < 0.5\\text{ms}$).
   - Read workloads are served from distributed **Redis** caches and read replicas, achieving sub-$10\\text{ms}$ response times.
4. **End-to-End Observability**:
   - Implement distributed tracing using **Micrometer / OpenTelemetry** and Prometheus Actuator health metrics.

*I would be delighted to dive deeper into any aspect of this solution—whether you'd like to see code snippets, database schemas, or algorithmic trade-offs. What part would you like to explore next?* 😊";
}
