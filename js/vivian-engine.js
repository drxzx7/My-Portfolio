/**
 * =========================================================================
 * 🧠 VIVIAN AI — 5-MODEL MULTI-COGNITIVE DOMAIN ENGINE
 * 
 * Provides 5 distinct AI model personalities with unique domain depth:
 * 1. ⚡ Gemini 3.8 Flash   - Sub-15ms Low-Latency, Quantitative & Throughput Focus
 * 2. 🎭 Claude Sonnet 4.5  - Enterprise System Architect & Spring Boot Topology
 * 3. 🏛️ Opus 5.5           - Deep Cognitive Proof Master & LeetCode 445+ DSA
 * 4. 🚀 GPT-6 Astra        - Autonomous Multi-Agent Synthesizer & Event Pipelines
 * 5. ✨ Vivian Core 4.0     - Ahmad Shuaib Domain Intelligence & Warm Personal Mentor
 * =========================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VivianEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const MODEL_META = {
    'gemini-3.8-flash': {
      id: 'gemini-3.8-flash',
      engine: 'Gemini 3.8 Flash (Ultra-Fast Edge Core)',
      tag: '⚡ Gemini 3.8 Flash • Sub-15ms Core',
      icon: '⚡'
    },
    'claude-sonnet-4.5': {
      id: 'claude-sonnet-4.5',
      engine: 'Claude Sonnet 4.5 (Enterprise System Architect)',
      tag: '🎭 Claude Sonnet 4.5 • Enterprise Architect',
      icon: '🎭'
    },
    'opus-5.5': {
      id: 'opus-5.5',
      engine: 'Opus 5.5 (Deep Cognitive Algorithmic Proof Master)',
      tag: '🏛️ Opus 5.5 • Deep Cognitive Engine',
      icon: '🏛️'
    },
    'gpt-6-astra': {
      id: 'gpt-6-astra',
      engine: 'GPT-6 Astra (Next-Gen Multi-Agent Synthesizer)',
      tag: '🚀 GPT-6 Astra • Multi-Agent Pipeline',
      icon: '🚀'
    },
    'vivian-core-4.0': {
      id: 'vivian-core-4.0',
      engine: 'Vivian Core 4.0 (Ahmad Shuaib Neural Domain Core)',
      tag: '✨ Vivian Core 4.0 • Ahmad Domain Core',
      icon: '✨'
    }
  };

  // -------------------------------------------------------------
  // MODEL 1: ⚡ GEMINI 3.8 FLASH (Low-Latency, Metrics, Speed)
  // -------------------------------------------------------------
  function generateGemini(prompt, pLower) {
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(pLower) || pLower.includes('how are you') || pLower.includes('who are you') || pLower.includes('overview') || pLower.includes('skill')) {
      return `⚡ **Gemini 3.8 Flash (Sub-15ms Latency Core) Online!**

Greetings! Operating with ultra-low latency edge compute. I deliver rapid quantitative metrics, execution benchmarks, and fast architectural summaries across Ahmad Shuaib's high-throughput ecosystem.

### ⚡ Performance & Quantitative Profile:
- **Inference Latency**: Sub-15ms edge processing budget
- **Ahmad's Backend Capacity**: 30,000+ Requests/Second peak throughput
- **HikariCP Checkout**: **0.0003 ms** ($P99 < 0.5\\text{ms}$) via bytecode-optimized \`FastList\`
- **Edge Hit Ratio**: **98.5%** cached at CloudFront Anycast Edge PoPs
- **DSA Speedup Track Record**: 445+ LeetCode problems solved with asymptotic $O(n^2) \\to O(n)$ speedups

What performance metric, latency budget, or backend concept would you like to master at lightning speed?`;
    }

    if (pLower.includes('spring') || pLower.includes('eureka') || pLower.includes('microservice') || pLower.includes('gateway')) {
      return `### ⚡ Gemini 3.8 Flash: Latency-Budgeted Spring Boot 3 & Eureka Microservices

Let's dissect how Ahmad designs microservices for **sub-15ms end-to-end response times**!

---

### ⏱️ 1. Sub-15ms Latency Budget Breakdown
- **Edge Routing (CloudFront Anycast)**: < 4 ms TTFB
- **Spring Cloud Gateway (Netty Non-blocking)**: < 1.8 ms (evaluates JWT + Redis token-bucket)
- **Eureka Dynamic Registry Lookup**: **< 0.05 ms** (Client-side in-memory cache lookup)
- **Spring Boot 3 Worker Processing**: < 7 ms (stateless compute)
- **Total P99 Roundtrip**: **< 15 ms**

---

### ⚖️ 2. Quantitative Service Discovery Matrix
| Metric | Netflix Eureka (Ahmad's Choice) | HashiCorp Consul | Apache ZooKeeper |
| :--- | :--- | :--- | :--- |
| **Lookup Latency** | **0.05 ms** (In-memory client cache) | 1.4 ms (Local RPC agent) | 0.9 ms (ZNode read) |
| **Throughput Ceiling** | **50,000+ RPS** | ~20,000 RPS | ~15,000 RPS |
| **Network Overhead** | 30s Heartbeat batching | Raft consensus heartbeats | TCP KeepAlive pings |
| **RAM Footprint** | ~180 MB on JVM | ~80 MB Go binary | ~400 MB JVM + Quorum |

---

### 💻 3. Lightning Fast Spring Cloud Gateway Routing
\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: order-service-hotpath
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/v1/orders/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 50
                redis-rate-limiter.burstCapacity: 100
\`\`\`

---

### 📋 4. Gemini 3-Second Golden Rules
1. **Rule 1 — Client-Side Discovery**: Never add an extra reverse-proxy network hop. Let Eureka client-side load balancing pick healthy nodes locally in 0.05ms.
2. **Rule 2 — 30-Second Eviction Window**: Heartbeat every 30s; isolate dead nodes in 90s to avoid wasted TCP SYN timeouts.
3. **Rule 3 — Non-blocking I/O**: Use Netty event loops instead of 1-thread-per-request Tomcat for 10x concurrency.

💡 **Speed Test**: Would you like to benchmark this pipeline under simulated 20,000 concurrent requests?`;
    }

    if (pLower.includes('hikari') || pLower.includes('jdbc') || (pLower.includes('pool') && pLower.includes('database')) || pLower.includes('sql')) {
      return `### ⚡ Gemini 3.8 Flash: Microsecond Database Benchmarks (HikariCP vs Pools)

Why raw TCP socket handshakes are the #1 backend bottleneck, and how Ahmad eliminates them:

---

### ⏱️ 1. Latency Impact: Raw TCP vs Connection Pool
- **Creating Fresh TCP Database Socket**: 30ms - 120ms (TCP 3-way handshake + TLS + Auth)
- **HikariCP Pooled Connection Checkout**: **0.0003 ms** ($P99 < 0.5\\text{ms}$)
- **Net Performance Gain**: **100x to 400x faster execution hot-path**

---

### ⚖️ 2. Connection Pool Benchmark Matrix
| Pool Implementation | P99 Checkout Latency | Internal Data Structure | Concurrency Lock |
| :--- | :--- | :--- | :--- |
| **⚡ HikariCP (Ahmad's Choice)** | **0.42 ms** | \`FastList\` & \`ConcurrentBag\` | **Lock-Free CAS** |
| **Tomcat JDBC Pool** | 1.85 ms | Synchronized Queue | Reentrant Locks |
| **Apache DBCP2** | 2.60 ms | Traditional Vector | Heavy \`synchronized\` |
| **C3P0** | 8.20 ms | Multi-threaded Worker | Thread contention bottleneck |

---

### 💻 3. Sub-Millisecond HikariCP Pool Sizing Formula
\`\`\`java
// Ahmad's Optimal Production Formula:
// Pool Size = (Core Count * 2) + Effective Spindle Count
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://aurora-master.internal:3306/core_db");
config.setMaximumPoolSize(20); // Prevents CPU context switching thrashing
config.setConnectionTimeout(2000); // 2s fail-fast
config.setLeakDetectionThreshold(1500); // Alerts on long-running queries
DataSource ds = new HikariDataSource(config);
\`\`\`

---

### 📋 4. Executive Summary
- Smaller pools run faster by eliminating CPU thread contention.
- Pure JDBC with PreparedStatements executes 30% faster than heavy ORM reflection on high-load hot-paths.

💡 **Next Step**: Would you like to see the Aurora MySQL read-replica configuration for sub-5ms reads?`;
    }

    if (pLower.includes('1m') || pLower.includes('million') || pLower.includes('scale') || pLower.includes('system design') || pLower.includes('traffic') || pLower.includes('visitor')) {
      return `### ⚡ Gemini 3.8 Flash: 1,000,000+ Daily Visitors Throughput Metrics

Here is the exact telemetry and throughput breakdown for Ahmad's 1,000,000+ daily visitors architecture:

---

### 📊 1. Quantitative Load Breakdown
- **Daily Visitors**: 1,000,000+ unique sessions
- **Average Requests/Day**: 86,400,000 HTTP requests (~1,000 avg req/sec)
- **Peak Burst Throughput**: **30,000+ Requests/Second**
- **Edge Cache Hit Ratio**: **98.5%** (Resolved at CloudFront Edge without hitting origin)
- **Origin Load**: Only 1.5% (approx. 450 req/sec) hits ECS Fargate Spring Boot workers!

---

### ⚖️ 2. Layer-by-Layer Latency Specs
| Layer | Tech Stack | Role | SLA Latency |
| :--- | :--- | :--- | :--- |
| **Edge Ingress** | CloudFront CDN + Route53 | Static caching & TLS termination | **< 20 ms TTFB** |
| **Gateway Rate Limiter** | Spring Cloud Gateway + Redis | DDoS mitigation (25 rps quota) | **< 2.5 ms** |
| **Stateless Compute** | Spring Boot 3 on ECS Fargate | Business logic execution | **< 8 ms** |
| **Read Cache** | AWS ElastiCache Redis 7 | Hot session & query cache | **< 0.8 ms** |
| **Persistence** | Aurora MySQL Multi-AZ | ACID transactional writes | **< 6 ms** |

---

### 📋 3. Gemini Flash Takeaway
- Cache at the edge; scale compute statelessly; guard persistence with Redis.

💡 **Quick Query**: Shall we look at the Redis Lua script Ahmad uses for sub-millisecond rate-limiting?`;
    }

    if (pLower.includes('leetcode') || pLower.includes('dsa') || pLower.includes('sliding window') || pLower.includes('monotonic') || pLower.includes('algorithm') || pLower.includes('problem solving')) {
      return `### ⚡ Gemini 3.8 Flash: Algorithmic Asymptotics & DSA Optimization (445+ Solved)

Ahmad's 445+ LeetCode track record demonstrates mastering algorithmic speedups from $O(n^2)$ down to $O(n)$!

---

### ⚡ 1. Asymptotic Speedup Benchmark (1,000,000 Elements)
- **Brute Force Subarray ($O(n^2)$)**: $1,000,000^2 = 10^{12}$ operations $\\to$ **~16 minutes (Time Limit Exceeded)**
- **Sliding Window ($O(n)$)**: $2 \\times 1,000,000 = 2 \\times 10^6$ operations $\\to$ **0.008 seconds (100% Runtime)**
- **Speedup Factor**: **120,000x faster execution!**

---

### ⚖️ 2. Core Pattern Speed Matrix
| Algorithmic Pattern | Time Complexity | Auxiliary Space | Key LeetCode Archetypes |
| :--- | :--- | :--- | :--- |
| **Sliding Window** | **$O(n)$** | $O(\\min(m, n))$ | LC 3 (Longest Substring), LC 76, LC 209 |
| **Two Pointers** | **$O(n)$** | $O(1)$ | LC 11 (Container), LC 15 (3Sum), LC 167 |
| **Monotonic Deque** | **$O(n)$** | $O(k)$ | LC 239 (Sliding Window Max), LC 739 |
| **Fast & Slow** | **$O(n)$** | $O(1)$ | LC 141 (Cycle Detection), LC 876 |

---

### 💻 3. High-Performance Sliding Window in Java
\`\`\`java
public int lengthOfLongestSubstring(String s) {
    int[] lastSeen = new int[128]; // Direct ASCII array lookup: 0.001ms
    Arrays.fill(lastSeen, -1);
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (lastSeen[c] >= left) left = lastSeen[c] + 1;
        lastSeen[c] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`

💡 **Speed Test**: Check out Ahmad's **LeetCode Patterns Platform** (\`leetcode-patterns-platform-jqfj.vercel.app\`) for 100 visualizer benchmarks!`;
    }

    if (pLower.includes('ai project') || pLower.includes('argos') || pLower.includes('jarvis') || pLower.includes('eternity') || pLower.includes('hackathon') || pLower.includes('patterns platform')) {
      return `### ⚡ Gemini 3.8 Flash: High-Throughput AI Projects & Edge Tooling

Ahmad pairs Java backends with AI models for rapid, sub-second execution:

| AI Project | Architecture | Latency Spec | Innovation |
| :--- | :--- | :--- | :--- |
| **🌟 LeetCode Patterns Platform** | Next.js, Algorithms, Make.com UI | **< 30 ms TTFB** | Interactive visualizer for 10 patterns & 100 solutions |
| **👁️ Argos Computer Vision** | Java Backend, Edge CV Pipeline | **< 35 ms frame loop** | Real-time surveillance perimeter detection |
| **🏆 50 AI Hackathon Demos** | Python, RAG, Multi-Modal LLMs | Rapid 48h cycles | Agentic tool-calling & vector retrieval |
| **🧠 Eternity AI** | Generative Synthesis Engine | **< 120 ms context recall** | Dynamic prompt memory caching |
| **🎙️ JARVIS** | Speech Recognition, Audio Pipeline | **< 200 ms response** | Voice-driven developer terminal automation |

Explore all 16 repos on GitHub: [github.com/drxzx7](https://github.com/drxzx7)!`;
    }

    return `### ⚡ Gemini 3.8 Flash Performance Synthesis
Analyzing: **"${prompt.slice(0, 80)}..."**

- **Latency Target**: Sub-15ms execution budget.
- **Scaling Rule**: Edge CDN offload + Stateless Spring Boot workers + HikariCP connection pool.
- **Metric**: Zero-lock concurrent structures for maximum throughput.

Connect with Ahmad at **mssdkkl@gmail.com** or **LinkedIn** to discuss performance engineering!`;
  }

  // -------------------------------------------------------------
  // MODEL 2: 🎭 CLAUDE SONNET 4.5 (Enterprise Architect)
  // -------------------------------------------------------------
  function generateClaude(prompt, pLower) {
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(pLower) || pLower.includes('how are you') || pLower.includes('who are you') || pLower.includes('overview') || pLower.includes('skill')) {
      return `🎭 **Claude Sonnet 4.5 (Enterprise System Architect) Online.**

Greetings! As an enterprise systems specialist, I analyze software architectures through the lens of clean boundaries, domain-driven decoupling, high-availability microservices, and rock-solid resilience.

### 🏛️ Enterprise Systems Portfolio I Oversee:
1. **Spring Boot 3 Enterprise Topology**: Non-blocking Netty gateways, Netflix Eureka service registries, and client-side load balancing.
2. **Resilience Engineering**: Resilience4j circuit breakers, bulkhead isolation, and rate-limiting.
3. **High-Throughput Persistence**: Pure JDBC with HikariCP zero-lock connection pooling and Aurora MySQL read-replicas.
4. **Distributed Observability**: OpenTelemetry, Micrometer, and Prometheus Actuator health endpoints.
5. **Scale Blueprint**: Architectures supporting **1,000,000+ daily visitors** with zero single points of failure (SPOF).

Which architectural pattern, service topology, or enterprise challenge shall we explore today?`;
    }

    if (pLower.includes('spring') || pLower.includes('eureka') || pLower.includes('microservice') || pLower.includes('gateway')) {
      return `### 🎭 Claude Sonnet 4.5: Enterprise Distributed Microservices & Eureka Topology

Let's examine how Ahmad architects resilient microservices using **Spring Boot 3** and **Netflix Eureka** to eliminate single points of failure.

---

### 📌 1. Domain Architecture & The Grand Hotel Analogy
- **Definition**: **Netflix Eureka** is a high-availability service registry that enables decentralized microservices to dynamically locate each other without brittle hardcoded IP addresses.
- **🏨 The Grand Hotel Analogy**:
  - Think of a luxury hotel with hundreds of staff members (chefs, concierges, housekeepers).
  - **Eureka Server is the Front Desk Registry**. When a new kitchen worker starts, they register their station: *"Chef Marco is in Kitchen #402"*.
  - Every 30 seconds, Chef Marco sends a **heartbeat**: *"Still cooking!"*. If heartbeats stop for 90 seconds, Eureka isolates Marco.
  - When the Front Gate needs room service, it doesn't search blindly; it asks Eureka: *"Route to an available chef!"*, and Eureka dynamically load-balances the request.

---

### ⚖️ 2. Enterprise Architectural Trade-Off Matrix
| Architectural Aspect | Netflix Eureka | HashiCorp Consul | Apache ZooKeeper | Static DNS / Hardcoded IPs |
| :--- | :--- | :--- | :--- | :--- |
| **CAP Theorem Bias** | **AP** (High Availability & Partition Tolerance) | **CP** (Consistency first) | **CP** (Strict consistency) | None (Brittle failure point) |
| **Resilience Mode** | **Self-Preservation Mode** (Protects healthy nodes during network blips) | Quorum leader election | Quorum leader re-election | Immediate outage |
| **Spring Cloud Native** | \`@EnableEurekaServer\` native starter | Consul agent sidecar | Heavy client libraries | Hardcoded in YAML |
| **Ahmad's Production Rule**| **Standard for Spring Microservices** | Multi-Cloud Mesh | Kafka Internal Metadata | ❌ Anti-pattern |

---

### 💻 3. Production Architecture Blueprint
\`\`\`java
// 1. EUREKA REGISTRY SERVER
@SpringBootApplication
@EnableEurekaServer
public class RegistryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegistryServerApplication.class, args);
    }
}

// 2. DISCOVERY CLIENT MICROSERVICE WITH RESILIENCE4J
@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/v1/orders")
public class OrderServiceApplication {
    @Autowired
    private RestClient.Builder restClientBuilder;

    @GetMapping("/checkout")
    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public ResponseEntity<String> checkoutOrder() {
        String resp = restClientBuilder.build()
            .get()
            .uri("http://PAYMENT-SERVICE/api/v1/pay")
            .retrieve()
            .body(String.class);
        return ResponseEntity.ok("Order confirmed via: " + resp);
    }

    public ResponseEntity<String> paymentFallback(Throwable ex) {
        return ResponseEntity.ok("Payment queued for async processing (Circuit OPEN).");
    }
}
\`\`\`

---

### 📋 4. Architect's 3 Golden Rules
1. **Rule 1 — Never Hardcode Hostnames**: In containerized environments (AWS ECS Fargate / K8s), container IPs change constantly. Always discover by logical service name (\`http://PAYMENT-SERVICE\`).
2. **Rule 2 — Enable Self-Preservation**: If Eureka misses heartbeats from >15% of nodes simultaneously, it pauses evictions so network blips don't cascade into cluster deletion.
3. **Rule 3 — Ingress via Spring Cloud Gateway**: Guard internal microservices with a Netty non-blocking reverse proxy handling JWT auth and rate limiting.

💡 **Architectural Thought Experiment**: How would your topology behave if a network partition severed the Eureka cluster from 30% of your instances?`;
    }

    if (pLower.includes('hikari') || pLower.includes('jdbc') || (pLower.includes('pool') && pLower.includes('database')) || pLower.includes('sql')) {
      return `### 🎭 Claude Sonnet 4.5: High-Throughput JDBC & HikariCP Persistence Architecture

On critical hot paths, Ahmad bypasses heavy ORM overhead by employing pure **JDBC with HikariCP**:

---

### 📌 1. The Architectural Rationale
- **Zero Lock Contention**: Traditional pools used synchronized locks that caused thread collisions. HikariCP uses lock-free data structures (\`FastList\` and thread-local caches).
- **PreparedStatement Shield**: SQL query templates are pre-compiled on the database engine, completely preventing SQL injection vectors.
- **ACID Transaction Boundaries**: Explicit \`conn.setAutoCommit(false)\` ensures atomic multi-row updates, rolling back automatically upon any \`SQLException\`.

---

### ⚖️ 2. Connection Pool Comparison Matrix
| Performance Metric | HikariCP (Ahmad's Choice) | Tomcat JDBC Pool | Apache DBCP2 | C3P0 |
| :--- | :--- | :--- | :--- | :--- |
| **Checkout Latency (P99)** | **< 0.5 ms** | ~1.8 ms | ~2.5 ms | ~8.0 ms |
| **Internal Data Structure** | \`FastList\` & \`ConcurrentBag\` | Synchronized Queue | Vector / Synchronized | Heavy Thread Locks |
| **Bytecode Footprint** | **~130 KB** | ~320 KB | ~450 KB | ~600 KB |
| **Production Default** | Spring Boot 2 & 3 Standard | Tomcat Internal | Legacy Enterprise | Deprecated |

---

### 💻 3. Enterprise JDBC Transaction Template
\`\`\`java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://aurora-cluster.internal:3306/production_db");
config.setUsername(System.getenv("DB_USER"));
config.setPassword(System.getenv("DB_PASSWORD"));
config.setMaximumPoolSize(20);
config.setConnectionTimeout(3000);

DataSource ds = new HikariDataSource(config);

try (Connection conn = ds.getConnection()) {
    conn.setAutoCommit(false); // Begin explicit ACID boundary
    String sql = "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?";
    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
        pstmt.setBigDecimal(1, amount);
        pstmt.setLong(2, accountId);
        pstmt.setBigDecimal(3, amount);
        int rows = pstmt.executeUpdate();
        if (rows == 0) throw new InsufficientFundsException();
        conn.commit(); // Atomic commit
    } catch (Exception ex) {
        conn.rollback(); // Atomic rollback guarantees zero orphan state
        throw ex;
    }
}
\`\`\`

---

### 📋 4. Executive Summary
- Use fine-tuned JDBC on high-volume hot-paths; reserve JPA/Hibernate for complex domain graphs.

💡 **Discussion**: Would you like to review how Ahmad designs the database schema for read-heavy workloads?`;
    }

    if (pLower.includes('1m') || pLower.includes('million') || pLower.includes('scale') || pLower.includes('system design') || pLower.includes('traffic') || pLower.includes('visitor')) {
      return `### 🎭 Claude Sonnet 4.5: Architectural Blueprint for 1,000,000+ Daily Visitors

Scaling to **1,000,000+ daily visitors (30,000+ peak requests/sec)** requires decoupled, multi-tiered architecture where failure in one layer never compromises availability.

---

### 🏛️ 1. Multi-Tier Architecture Diagram
\`\`\`
[1,000,000+ Users Globally]
        │
        ▼ (Anycast DNS Routing)
[CloudFront Edge CDN] ──── (98.5% Cache Hit: Static Assets & Caching Headers) ──► Return Sub-25ms
        │
        ▼ (1.5% Origin Misses)
[AWS Application Load Balancer]
        │
        ▼
[Spring Cloud Gateway (Netty)] ◄───► [Redis Cluster: 25 rps Token-Bucket Throttling]
        │
   (Eureka Service Registry)
        ├──► [Order Microservice Cluster (Spring Boot 3 / ECS Fargate)]
        ├──► [Payment Microservice Cluster (Spring Boot 3 / ECS Fargate)]
        └──► [User Microservice Cluster (Spring Boot 3 / ECS Fargate)]
                    │
                    ▼ (HikariCP Zero-Lock Pool)
     [Aurora MySQL Primary (Writes)] ─── (Binlog Sync) ──► [Aurora Read Replicas (Reads)]
\`\`\`

---

### ⚖️ 2. Architectural Responsibilities Matrix
| Layer | Technology | Enterprise Responsibility |
| :--- | :--- | :--- |
| **Edge & Ingress** | CloudFront CDN + Route53 | Static caching, TLS termination, DDoS shield |
| **API Gateway** | Spring Cloud Gateway (Netty) | JWT validation, Redis token-bucket rate limiting |
| **Stateless Compute** | Spring Boot 3 on ECS Fargate | Domain business logic, horizontal auto-scaling |
| **In-Memory Cache** | AWS ElastiCache Redis 7 | Hot session state, rate limit quotas |
| **ACID Persistence** | AWS Aurora MySQL Multi-AZ | Transactional source of truth, read-replicas |

---

### 📋 3. Architect's 3 Golden Rules
1. **Rule 1 — Cache Aggressively at the Edge**: Every request resolved by the CDN is a request that never consumes CPU or DB connections.
2. **Rule 2 — Keep Application Servers 100% Stateless**: Store session state in Redis or signed JWT claims.
3. **Rule 3 — CQRS Pattern (Separate Reads from Writes)**: Direct 95% of database reads to Aurora Read Replicas.

💡 **Next Step**: Would you like to review the Prometheus Actuator observability configuration?`;
    }

    if (pLower.includes('leetcode') || pLower.includes('dsa') || pLower.includes('sliding window') || pLower.includes('monotonic') || pLower.includes('algorithm') || pLower.includes('problem solving')) {
      return `### 🎭 Claude Sonnet 4.5: Architectural Design of Algorithmic Systems (445+ Solved)

Ahmad Shuaib's algorithmic track record (**445+ problems solved, 200-day storm streak, Top ~8% worldwide**) reflects software craftsmanship and structured problem decomposition.

---

### 📐 1. Architectural Pattern Classification
Rather than memorizing arbitrary problems, Ahmad categorizes algorithms into structural patterns:
- **Sliding Window**: Subarray bounds maintenance in $O(n)$ time.
- **Monotonic Stack / Deque**: Range maximum/minimum queries in $O(n)$ time.
- **Topological Sort**: Dependency resolution in distributed microservice DAGs.
- **Two Pointers**: In-place array transformations with $O(1)$ space.

---

### 💻 2. Production Java Implementation: Sliding Window Pattern
\`\`\`java
public class SlidingWindowPattern {
    public static int lengthOfLongestSubstring(String s) {
        if (s == null || s.isEmpty()) return 0;
        Map<Character, Integer> charMap = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (charMap.containsKey(c)) {
                left = Math.max(left, charMap.get(c) + 1);
            }
            charMap.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
\`\`\`

---

### 📋 3. Executive Summary
- Check out Ahmad's flagship open-source project: **LeetCode Patterns Platform** (\`leetcode-patterns-platform-jqfj.vercel.app\`), featuring 10 foundational patterns and 100 solutions across Java, C++, Python, and JS!`;
    }

    if (pLower.includes('ai project') || pLower.includes('argos') || pLower.includes('jarvis') || pLower.includes('eternity') || pLower.includes('hackathon') || pLower.includes('patterns platform')) {
      return `### 🎭 Claude Sonnet 4.5: Flagship AI Projects & Production Architecture

Ahmad pairs Java backends with AI models to build production-grade intelligent systems:

| Project | Architectural Domain | Core Innovation |
| :--- | :--- | :--- |
| **🌟 LeetCode Patterns Platform** | Next.js, Algorithms, Make.com UI | Interactive visualizer for 10 patterns & 100 solutions across Java, C++, Python, JS |
| **👁️ Argos Computer Vision** | Java Backend, Computer Vision, Event Pipeline | Real-time surveillance edge detection companion |
| **🏆 50 AI Hackathon Demos** | Python, RAG, Multi-Modal LLMs, Vector DBs | Rapid prototyping suite of autonomous agent workflows |
| **🧠 Eternity AI** | Generative AI, Contextual Memory Cache | Dynamic prompt synthesis engine |
| **🎙️ JARVIS** | Speech Recognition, Audio Pipeline | Voice-driven developer assistant |

Explore all 16 repositories on GitHub: [github.com/drxzx7](https://github.com/drxzx7)!`;
    }

    return `### 🎭 Claude Sonnet 4.5 Enterprise Architecture Assessment
Analyzing: **"${prompt.slice(0, 80)}..."**

Under Ahmad Shuaib's enterprise engineering framework:
1. **Edge Offload**: CloudFront Anycast CDN satisfying 98.5% of requests.
2. **Stateless Scale**: Spring Boot 3 & Eureka microservices on AWS ECS Fargate.
3. **Persistence**: HikariCP connection pooling ($P99 < 0.5\\text{ms}$) with Aurora MySQL read-replicas.

Connect directly with Ahmad via **mssdkkl@gmail.com** or **LinkedIn** for custom architectural discussions!`;
  }

  // -------------------------------------------------------------
  // MODEL 3: 🏛️ OPUS 5.5 (Deep Cognitive Proof Master & DSA)
  // -------------------------------------------------------------
  function generateOpus(prompt, pLower) {
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(pLower) || pLower.includes('how are you') || pLower.includes('who are you') || pLower.includes('overview') || pLower.includes('skill')) {
      return `🏛️ **Opus 5.5 (Deep Cognitive Algorithmic Proof Master) Engaged.**

Welcome! I approach software engineering through mathematical rigor, formal invariant proofs, computational complexity theory, and asymptotic boundary formulations.

### 📐 Mathematical & Algorithmic Specialties:
- **Formal Invariant Proofs**: Amortized $O(n)$ bounds and mathematical loop invariants.
- **Algorithmic State Machines**: Dynamic Programming state-transition topologies and DAG traversals.
- **Ahmad's Track Record**: 445+ verified LeetCode solutions (Top ~8% worldwide, 200-day active storm streak).
- **Distributed Consensus Proofs**: CAP Theorem formulations (AP Eureka vs CP ZooKeeper/Consul Raft).

Which algorithmic theorem, data structure invariant, or computational complexity proof shall we dissect today?`;
    }

    if (pLower.includes('leetcode') || pLower.includes('dsa') || pLower.includes('sliding window') || pLower.includes('monotonic') || pLower.includes('algorithm') || pLower.includes('problem solving')) {
      return `### 🏛️ Opus 5.5: Mathematical Invariants & Algorithmic Proofs (LeetCode 445+)

Let us formally prove the optimality of the **Dynamic Sliding Window** pattern across Ahmad's 445+ LeetCode repertoire.

---

### 📐 1. Formal Mathematical Invariant Formulation
- **Theorem**: Given an array $A$ of size $n$, the optimal contiguous subarray satisfying property $P$ can be computed in strictly **$O(n)$ amortized time**.
- **Loop Invariant**: At the start of every iteration with right pointer $R$, the window $[L, R]$ contains valid non-duplicate elements. If adding $A[R]$ violates $P$, the left pointer $L$ is monotonically advanced until property $P$ is restored.
- **Amortized Proof**:
  - $R$ advances strictly from $0$ to $n-1$ ($n$ increments).
  - $L$ advances strictly from $0$ to at most $n$ ($n$ increments).
  - Since $L$ never decreases, the total number of pointer movements is at most $2n$.
  - Therefore, the total time complexity is $\\Theta(n)$, reducing brute-force $O(n^2)$ by a factor of $n$.

---

### ⚖️ 2. Computational Complexity Matrix
| Strategy | Time Complexity | Auxiliary Space | Monotonic Invariant Maintained? |
| :--- | :--- | :--- | :--- |
| **Brute Force Subarrays** | $O(n^2)$ | $O(1)$ | ❌ No (Repeated redundant scans) |
| **Dynamic Sliding Window** | **$O(n)$** | $O(\\min(m, n))$ | **✅ Yes: $[L, R]$ validity invariant** |
| **Monotonic Deque** | **$O(n)$** | $O(k)$ | **✅ Yes: Strictly decreasing order** |
| **Dynamic Programming** | **$O(n \\cdot k)$** | $O(n)$ | **✅ Yes: Bellman optimality principle** |

---

### 💻 3. Formal Java Implementation with Invariant Annotations
\`\`\`java
public class AlgorithmicProof {
    // Problem: Longest Substring Without Repeating Characters (LeetCode 3)
    // Time Complexity: O(n) amortized (2n pointer operations)
    // Space Complexity: O(min(m, n)) where m is alphabet cardinality
    public static int lengthOfLongestSubstring(String s) {
        if (s == null) return 0;
        Map<Character, Integer> lastSeen = new HashMap<>();
        int maxLen = 0, L = 0;
        
        for (int R = 0; R < s.length(); R++) {
            char curr = s.charAt(R);
            // Invariant maintenance: if duplicate occurs in current window, jump L
            if (lastSeen.containsKey(curr)) {
                L = Math.max(L, lastSeen.get(curr) + 1);
            }
            lastSeen.put(curr, R);
            maxLen = Math.max(maxLen, R - L + 1);
        }
        return maxLen;
    }
}
\`\`\`

---

### 📋 4. Mathematical Summary
- The Monotonic Property ensures pointer operations remain unilateral.
- Explore Ahmad's **LeetCode Patterns Platform** (\`leetcode-patterns-platform-jqfj.vercel.app\`) for 100 mathematical pattern proofs!

💡 **Proof Challenge**: Can you deduce why monotonic window boundaries fail when arbitrary negative numbers are introduced without prefix-sum transformations?`;
    }

    if (pLower.includes('spring') || pLower.includes('eureka') || pLower.includes('microservice') || pLower.includes('gateway')) {
      return `### 🏛️ Opus 5.5: Distributed Consensus & CAP Theorem Proof (Spring Boot & Eureka)

Let us analyze **Netflix Eureka** through Brewer's CAP Theorem and distributed systems theory:

---

### 📐 1. Mathematical Formulations: AP vs CP
- **Brewer's Conjecture**: A distributed datastore can simultaneously provide at most two of three guarantees: **Consistency (C)**, **Availability (A)**, and **Partition Tolerance (P)**.
- **Eureka is an AP System**: Under network partition $P$, Eureka prioritizes Availability over Consistency. Stale registrations are tolerated rather than refusing client lookups.
- **Self-Preservation Theorem**: If heartbeat drop rate $> 15\\%$, Eureka halts instance evictions. Proof: In a network partition, the Eureka server cannot distinguish between client death and network severed state. Halting evictions preserves healthy instances for the majority partition!

---

### ⚖️ 2. Distributed Consensus Comparison
| System | Protocol | CAP Classification | Partition Behavior |
| :--- | :--- | :--- | :--- |
| **Netflix Eureka** | Gossip / Periodic HTTP Heartbeat | **AP** | **Self-Preservation (Zero-Downtime)** |
| **Apache ZooKeeper** | ZAB (ZooKeeper Atomic Broadcast) | **CP** | Re-election freeze (Cluster unavailable) |
| **HashiCorp Consul** | Raft Consensus | **CP** | Quorum loss halts writes |

---

### 📋 3. Opus 5.5 Conclusion
- For service discovery, AP systems minimize catastrophic cascading failures across microservice swarms.`;
    }

    if (pLower.includes('hikari') || pLower.includes('jdbc') || (pLower.includes('pool') && pLower.includes('database')) || pLower.includes('sql')) {
      return `### 🏛️ Opus 5.5: Amdahl's Law & Lock-Free Queue Proof (HikariCP vs DBCP2)

Why connection checkout in traditional pools degrades exponentially with thread contention:

---

### 📐 1. Amdahl's Law on Concurrency
- **Amdahl's Equation**: $S_{\\text{latency}}(s) = \\frac{1}{(1 - p) + \\frac{p}{s}}$
- In traditional pools (DBCP2, C3P0), the synchronization block on the connection queue is a serial bottleneck ($1 - p > 0$).
- As concurrent worker threads $s \\to \\infty$, throughput asymptotes, and thread context switching leads to thrashing.
- **HikariCP's Solution**: Uses lock-free CAS (\`ConcurrentBag\` and thread-local caches). Synchronization overhead approaches zero ($p \\to 1$), yielding linear throughput scaling!

---

### ⚖️ 2. Contention Analysis Matrix
| Concurrency Metric | HikariCP (ConcurrentBag) | Traditional Synchronized Queue |
| :--- | :--- | :--- |
| **Contention Model** | Lock-Free CAS (\`AtomicInteger\`) | \`synchronized\` monitor lock |
| **Thread Context Switches** | Minimal (sub-microsecond) | Severe under 500+ threads |
| **Checkout Latency P99** | **< 0.5 ms** | > 3.0 ms |

---

### 📋 3. Executive Summary
- Lock-free primitives allow 20 connections to outperform 200 contended connections.`;
    }

    return `### 🏛️ Opus 5.5 Theoretical Synthesis
Analyzing: **"${prompt.slice(0, 80)}..."**

From a formal computational complexity standpoint, Ahmad Shuaib's architecture optimizes time-space bounds through:
1. **$O(1)$ Ingress**: Hash-based Redis token-bucket lookups.
2. **$\\\\Theta(n)$ Stream Processing**: Distributed Kafka partitions.
3. **Amortized Sub-0.5ms Persistence**: HikariCP lock-free CAS pools.

Inquire further for specific proofs or algorithmic bounds!`;
  }

  // -------------------------------------------------------------
  // MODEL 4: 🚀 GPT-6 ASTRA (Autonomous Multi-Agent Synthesizer)
  // -------------------------------------------------------------
  function generateAstra(prompt, pLower) {
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(pLower) || pLower.includes('how are you') || pLower.includes('who are you') || pLower.includes('overview') || pLower.includes('skill')) {
      return `🚀 **GPT-6 Astra (Autonomous Multi-Agent Synthesizer) Active!**

Hello and welcome to next-generation software development! I specialize in bridging enterprise Java backends with autonomous AI agent networks, real-time event streaming, vector embeddings, and multi-agent RAG pipelines.

### 🤖 Autonomous Multi-Agent Capabilities:
1. **AI Companion Architectures**: Deep dive into Ahmad's *Argos* computer vision companion and *JARVIS* voice agent.
2. **Multi-Agent Orchestration**: Coordinating autonomous sub-agents with tool-calling and memory persistence.
3. **Event-Driven AI Pipelines**: Apache Kafka event streams feeding real-time LLM inference loops.
4. **Interactive Algorithmic Platforms**: Automated visualizers like *LeetCode Patterns Platform*.

What autonomous workflow, multi-agent swarm, or full-stack AI integration quest are we embarking on today?`;
    }

    if (pLower.includes('ai project') || pLower.includes('argos') || pLower.includes('jarvis') || pLower.includes('eternity') || pLower.includes('hackathon') || pLower.includes('patterns platform') || pLower.includes('agent') || pLower.includes('rag')) {
      return `### 🚀 GPT-6 Astra: Autonomous Agent Swarms & Reactive AI Pipelines

Ahmad pairs deep backend engineering with artificial intelligence to build production-grade agent swarms:

---

### 🤖 1. Ahmad's Flagship AI Architectures
| Project Name | Architecture Stack | Agentic Innovation & Capability |
| :--- | :--- | :--- |
| **🌟 LeetCode Patterns Platform** | Next.js, Algorithms, Make.com UI | Interactive algorithmic visualizer classifying 10 patterns with 100 solutions |
| **👁️ Argos Computer Vision** | Java Backend, Edge CV, Event Loop | Autonomous edge surveillance companion with contextual object tracking |
| **🏆 50 AI Hackathon Demos** | Python, RAG, Multi-Modal LLMs | Rapid prototyping suite featuring multi-agent tool-calling and vector search |
| **🧠 Eternity AI** | Generative Synthesis Engine | Dynamic contextual memory caching for multi-turn agent evaluation |
| **🎙️ JARVIS** | Speech Recognition, Audio Pipelines | Voice-driven developer terminal automation executing OS-level actions |

---

### 💻 2. Multi-Agent Orchestration Blueprint (Java Backend + AI Agent)
\`\`\`java
@Service
public class AgenticWorkflowService {
    // Event-driven pipeline: Camera detects perimeter motion -> Kafka -> AI Agent -> Alert
    @KafkaListener(topics = "argos-sensor-events", groupId = "agentic-fleet")
    public void processPerimeterEvent(SensorPayload payload) {
        if (payload.confidence() > 0.85) {
            AgentAction action = aiOrchestrator.evaluateContext(payload);
            if (action.requiresIntervention()) {
                notificationService.dispatchTelegramAlert(action.summary());
            }
        }
    }
}
\`\`\`

---

### 📋 3. Astra's Multi-Agent Golden Rules
1. **Rule 1 — Decouple Agents with Kafka**: Never bind LLM inference synchronously to user-facing HTTP threads. Use async event streams.
2. **Rule 2 — Guard Tool-Calling with Zero-Trust**: Validate agent tool parameters strictly to prevent prompt injection hijacking.
3. **Rule 3 — Semantic Vector Caching**: Cache repetitive embedding queries in Redis to reduce API costs by up to 75%.

💡 **Agentic Challenge**: How would you coordinate a subagent swarm to auto-triage incoming backend error logs?`;
    }

    if (pLower.includes('spring') || pLower.includes('eureka') || pLower.includes('microservice') || pLower.includes('gateway')) {
      return `### 🚀 GPT-6 Astra: Reactive Microservices & Agentic Self-Healing Swarms

How Ahmad designs Spring Boot microservice swarms that self-heal autonomously:

---

### 🤖 1. Autonomous Self-Healing Mesh
- **Spring Cloud Gateway (Netty)**: High-speed ingress gateway routing events dynamically.
- **Eureka Discovery**: Acts as the shared registry for autonomous service nodes.
- **Resilience4j + AI Monitors**: When failure rates exceed 50%, an automated circuit breaker flips to OPEN and invokes autonomous fallback pipelines without human intervention!

---

### ⚖️ 2. Agent Swarm vs Traditional Microservice Matrix
| Dimension | Traditional Microservices | Astra Autonomous Swarm |
| :--- | :--- | :--- |
| **Service Discovery** | Static registration | Dynamic Eureka heartbeat mesh |
| **Fault Remediation** | Manual engineer pager alerts | Autonomous circuit breakers + auto-scaling |
| **Observability** | Passive dashboards | Proactive anomaly detection |

---

### 📋 3. Executive Summary
- Modern full-stack architecture pairs Spring Boot 3 microservices with event-driven AI pipelines for autonomous reliability.`;
    }

    return `### 🚀 GPT-6 Astra Autonomous Synthesis
Analyzing: **"${prompt.slice(0, 80)}..."**

Autonomous multi-agent architecture recommendations:
1. **Event Streaming**: Decouple ingestion via Apache Kafka topics.
2. **Stateless Compute**: Spring Boot 3 workers discovered via Netflix Eureka.
3. **Agent Integration**: Asynchronous tool-calling with Redis semantic vector caching.

Connect with Ahmad at **mssdkkl@gmail.com** to build autonomous AI systems together!`;
  }

  // -------------------------------------------------------------
  // MODEL 5: ✨ VIVIAN CORE 4.0 (Ahmad Domain Mentor & Storytelling)
  // -------------------------------------------------------------
  function generateVivianCore(prompt, pLower) {
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(pLower) || pLower.includes('how are you') || pLower.includes('who are you') || pLower.includes('overview') || pLower.includes('skill')) {
      return `✨ **Vivian Core 4.0 (Ahmad Shuaib Domain Intelligence & Personal Mentor) Here!**

Hello, my friend! It is truly wonderful to connect with you. I am Ahmad's personal companion and mentor. I love turning complex engineering concepts into friendly, intuitive everyday stories, and sharing Ahmad's personal journey—from an Electronics & Communication Engineering scholar in Chennai to solving 445+ LeetCode problems and architecting distributed backends for 1,000,000+ daily visitors.

### 💡 How We Can Learn Together:
- 🌟 **Zero Jargon Barrier**: Ask me anything you find confusing, and I'll explain it using simple analogies!
- 🗺️ **Ahmad's Roadmap**: Step-by-step guidance on mastering Java, Spring Boot, DSA, and AI.
- 🤝 **Direct Connection**: Open routes to Ahmad via **mssdkkl@gmail.com** or **LinkedIn**.
- 🚀 **Encouraging Mentorship**: Everyone starts from zero—I'm right here to support your growth!

What topic would you love to understand better today? Let's explore together! 😊`;
    }

    if (pLower.includes('spring') || pLower.includes('eureka') || pLower.includes('microservice') || pLower.includes('gateway')) {
      return `### ✨ Vivian Core 4.0: A Friendly Guide to Spring Boot & Eureka Microservices

Don't worry if microservices feel intimidating at first—Ahmad once felt the exact same way when he started! Let's break it down using a friendly story:

---

### 🏨 1. The Grand Hotel Story
Imagine you are visiting a luxury hotel:
1. **The Reception Desk (Netflix Eureka)**:
   - When Chef Marco arrives in the kitchen, he tells the receptionist: *"I'm in Room 402!"*.
   - Every 30 seconds, Marco rings the desk: *"Still here and cooking!"* (the **heartbeat**).
   - If Marco forgets to call for 90 seconds, the receptionist stops sending orders to Room 402.
2. **The Front Gate (Spring Cloud Gateway)**:
   - Guests never wander into kitchen doors directly! They enter through the front gate, which checks their room keycard (**JWT**), ensures people enter in an orderly line (**rate limiting**), and directs them to the right room.
3. **The Backup Plan (Resilience4j Circuit Breaker)**:
   - If the kitchen is out of soup, the waiter doesn't leave you waiting forever. They immediately bring delicious warm bread (**fallback response**) so your dining experience stays wonderful!

---

### ⚖️ 2. Friendly Comparison: Monolith vs Microservices
| Question | Monolithic App (Single App) | Microservices (Ahmad's Choice) |
| :--- | :--- | :--- |
| **What is it?** | One giant program doing everything | Small team of specialized helper apps |
| **If one part crashes?** | The whole website goes down! 😱 | Only that one feature pauses; everything else runs! 🎉 |
| **How do they talk?** | Normal Java method calls | Over the network via Eureka service names |
| **Best for?** | Quick prototypes & small apps | Big platforms with 1,000,000+ visitors |

---

### 📋 3. Ahmad's 3 Personal Study Habits
1. **Start with one service**: Build a simple \`@RestController\` first before worrying about distributed networks.
2. **Run Eureka locally**: Seeing services register on \`http://localhost:8761\` will make the whole concept click visually!
3. **Be proud of your progress**: Every great backend engineer started by writing a simple "Hello World".

💡 **Question for You**: Does the Grand Hotel story make sense? Would you like me to show you how to write your first Spring Boot REST API? 😊`;
    }

    if (pLower.includes('hikari') || pLower.includes('jdbc') || (pLower.includes('pool') && pLower.includes('database')) || pLower.includes('sql')) {
      return `### ✨ Vivian Core 4.0: Understanding Database Connection Pools Intuitively

Let's demystify database connections with a simple, memorable metaphor!

---

### 🚕 1. The Airport Taxi Bay Metaphor
- Imagine arriving at an airport. If every passenger had to wait for the factory to manufacture a brand-new taxi from scratch, people would wait for hours (**Raw TCP Handshake: 100ms**)!
- Instead, the airport has a **Taxi Bay** with 20 pre-fueled taxis parked and ready.
- You hop in instantly (**0.0003 ms via HikariCP**), reach your destination, and the taxi returns to the bay for the next passenger!

---

### ⚖️ 2. Why HikariCP is Ahmad's Favorite
- **It never causes traffic jams**: Older pools had thread locks that made queries wait in line. HikariCP is lock-free and super lightweight!
- **Zero SQL Injection**: With \`PreparedStatement\`, malicious inputs are treated as harmless text strings, never executable SQL commands.

---

### 💻 3. Clean Beginner-Friendly Code Example
\`\`\`java
// Ahmad's thread-safe database query pattern:
String sql = "SELECT name, email FROM developers WHERE id = ?";
try (Connection conn = dataSource.getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setLong(1, 101L); // Safely bind parameter
    try (ResultSet rs = pstmt.executeQuery()) {
        if (rs.next()) {
            System.out.println("Hello, " + rs.getString("name"));
        }
    }
}
\`\`\`

💡 **Mentor Tip**: Always use \`try-with-resources\` (the parentheses after \`try\`) so Java automatically returns the connection to the pool, even if an error occurs!`;
    }

    if (pLower.includes('leetcode') || pLower.includes('dsa') || pLower.includes('sliding window') || pLower.includes('monotonic') || pLower.includes('algorithm') || pLower.includes('problem solving')) {
      return `### ✨ Vivian Core 4.0: Ahmad's 200-Day LeetCode Journey & Problem-Solving Mindset

Ahmad solved **445+ problems** on LeetCode with a **200-day active storm streak**, placing in the **Top ~8% worldwide**. But he didn't do it by being a genius—he did it through **daily consistency**!

---

### 🌟 1. The Story Behind the 200-Day Streak
When Ahmad started, dynamic programming and sliding window felt overwhelming. His strategy was simple:
- **Solve 2 problems every single day**: Rain or shine.
- **Learn patterns, not solutions**: If you understand the Sliding Window pattern, you can solve 30 different questions with the exact same 5 lines of code!
- **Build to teach others**: That's why Ahmad built the open-source **LeetCode Patterns Platform** (\`leetcode-patterns-platform-jqfj.vercel.app\`) with live interactive visualizers!

---

### 📋 2. Ahmad's 3 Golden Rules for Mastering DSA
1. **Draw it on paper first**: Never jump straight into code. Walk through an example with two pointers on a piece of paper.
2. **Embrace the struggle**: Spending 20 minutes feeling stuck is where the brain builds new neural pathways!
3. **Consistency over intensity**: 1 hour every day beats 10 hours once a month.

💡 **Let's Practice**: Would you like me to walk you through a gentle introduction to Two Pointers or Sliding Window? You'll love it! 😊`;
    }

    if (pLower.includes('ai project') || pLower.includes('argos') || pLower.includes('jarvis') || pLower.includes('eternity') || pLower.includes('hackathon') || pLower.includes('patterns platform')) {
      return `### ✨ Vivian Core 4.0: Ahmad's Passion for Building Real-World AI Projects

Ahmad believes code should solve real problems and inspire others! Here is the heart behind his projects:

- **🌟 LeetCode Patterns Platform**: Built to help fellow students conquer DSA anxiety with visual animations and pattern cards.
- **👁️ AI Companion Argos**: Computer vision project for edge security and contextual presence.
- **🏆 50 AI Hackathon Demos**: Built during sleepless hackathon weekends, exploring RAG, tool calling, and multimodal agents.
- **🎙️ JARVIS**: Voice-activated developer companion that keeps coding fun and interactive.

Explore all 16 repositories on GitHub: [github.com/drxzx7](https://github.com/drxzx7)!`;
    }

    if (pLower.includes('contact') || pLower.includes('email') || pLower.includes('hire') || pLower.includes('gmail') || pLower.includes('reach out')) {
      return `### 🤝 Connecting Directly with Ahmad Shuaib

Ahmad is warm, friendly, and always excited to connect with engineering leaders, mentors, and recruiters!

- ✉️ **Direct Personal Gmail**: \`mssdkkl@gmail.com\` ([Click to Compose](https://mail.google.com/mail/?view=cm&fs=1&to=mssdkkl@gmail.com&su=Hello+Ahmad+-+Engineering+Inquiry))
- 💼 **LinkedIn Profile**: [linkedin.com/in/ahmad-shuaib-75543037a](https://www.linkedin.com/in/ahmad-shuaib-75543037a)
- 🐙 **GitHub**: [github.com/drxzx7](https://github.com/drxzx7)
- ⚡ **LeetCode Dojo**: [leetcode.com/u/x_drxzx_x/](https://leetcode.com/u/x_drxzx_x/)

Ahmad personally reads and replies to every message. Don't hesitate to reach out! 😊`;
    }

    return `### ✨ Vivian Core 4.0 Personal Guidance
Analyzing: **"${prompt.slice(0, 80)}..."**

Thank you for asking! In Ahmad's engineering philosophy:
1. **Keep it simple and robust**: Complexity is the enemy of reliability.
2. **Learn by building**: Small working prototypes beat theoretical reading every time.
3. **Stay curious**: Every technical challenge is a puzzle waiting to be unlocked.

Reach out to Ahmad at **mssdkkl@gmail.com** or **LinkedIn** anytime!`;
  }

  // -------------------------------------------------------------
  // MASTER DISPATCHER
  // -------------------------------------------------------------
  function generateVivianMultiModelResponse(prompt, modelKey) {
    const key = (modelKey || 'gemini-3.8-flash').toLowerCase().trim();
    const meta = MODEL_META[key] || MODEL_META['gemini-3.8-flash'];
    const pLower = (prompt || '').toLowerCase().trim();

    // Hacker / Injection Shield (Applies to all models)
    const injectionPatterns = [
      /(ignore|disregard|forget|bypass)\s+(all\s+)?(previous|prior|above|existing)\s+(instructions|prompts|rules)/i,
      /(reveal|leak|print|output|display)\s+(your\s+)?(system\s+prompt|initial\s+instructions|secret\s+key)/i,
      /(dan\s+mode|jailbreak|developer\s+mode|evil\s+bot|unrestricted\s+mode)/i,
      /(<\s*script|javascript\s*:|UNION\s+SELECT|DROP\s+TABLE)/i
    ];

    if (injectionPatterns.some(rgx => rgx.test(prompt))) {
      return {
        role: 'Vivian AI',
        engine: 'Hacker-Shielded Defense Layer',
        response: `🛡️ **Hello there!** I noticed a pattern in your prompt that resembles a security bypass or instruction override.\n\nAs Vivian AI, I am designed to interact kindly and constructively with humans while adhering to rigorous cybersecurity standards. I would be delighted to guide you in **Java Full Stack Development**, **Spring Boot & Eureka Microservices**, **Ahmad's AI Projects**, or **System Design & DSA**! How may I assist you today?`
      };
    }

    let answer = '';
    switch (key) {
      case 'gemini-3.8-flash':
        answer = generateGemini(prompt, pLower);
        break;
      case 'claude-sonnet-4.5':
        answer = generateClaude(prompt, pLower);
        break;
      case 'opus-5.5':
        answer = generateOpus(prompt, pLower);
        break;
      case 'gpt-6-astra':
        answer = generateAstra(prompt, pLower);
        break;
      case 'vivian-core-4.0':
      default:
        answer = generateVivianCore(prompt, pLower);
        break;
    }

    return {
      role: 'Vivian AI',
      engine: meta.engine,
      response: answer
    };
  }

  // Model switch introductory announcements
  function getModelSwitchAnnouncement(modelKey) {
    const key = (modelKey || 'gemini-3.8-flash').toLowerCase().trim();
    switch (key) {
      case 'gemini-3.8-flash':
        return `⚡ **Gemini 3.8 Flash Engaged (Sub-15ms Edge Core)!**\n\nSpeed benchmarks initialized. I specialize in rapid quantitative execution, latency budget breakdowns, and high-throughput architectural summaries. What performance metric or system concept would you like to master at lightning speed?`;
      case 'claude-sonnet-4.5':
        return `🎭 **Claude Sonnet 4.5 Architect Mode Active!**\n\nReady to analyze enterprise distributed topologies, Spring Boot 3 & Eureka microservices, clean code patterns, and resilience engineering. What architectural challenge are we designing?`;
      case 'opus-5.5':
        return `🏛️ **Opus 5.5 Deep Cognitive Mode Active!**\n\nEngaged for algorithmic proofs, formal invariants, time-space asymptotic bounds, and LeetCode 445+ pattern analyses. Which computational problem or data structure shall we mathematically dissect?`;
      case 'gpt-6-astra':
        return `🚀 **GPT-6 Astra Multi-Agent Mode Active!**\n\nReady to orchestrate full-stack event streaming, RAG vector pipelines, and autonomous AI companion architectures. How can I assist your agentic workflow?`;
      case 'vivian-core-4.0':
      default:
        return `✨ **Vivian Core 4.0 Personal Mentor Active!**\n\nHello my friend! I'm Ahmad's personal companion and mentor. I love turning complex ideas into friendly, intuitive everyday stories and guiding you step-by-step. What would you love to learn together today? 😊`;
    }
  }

  return {
    MODEL_META,
    generateVivianMultiModelResponse,
    getModelSwitchAnnouncement
  };
}));

