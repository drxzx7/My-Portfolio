/**
 * =========================================================================
 * ⚡ AHMAD SHUAIB — BACKEND & SYSTEMS PORTFOLIO INTERACTIVE ENGINE
 * High-performance, zero heavy dependencies, 60fps animations
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initParticleCanvas();
  initDiagramTabs();
  initApiExplorer();
  initTrafficSimulator();
  initResumeModal();
  initProjectsFilter();
  initStatsObserver();
  initInteractiveTerminal();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 0. SYSTEM DESIGN DIAGRAM TABS CONTROLLER
 * ------------------------------------------------------------- */
function initDiagramTabs() {
  const tabBtns = document.querySelectorAll('.diagram-tab-btn');
  const panels = document.querySelectorAll('.diagram-view-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 1. THEME TOGGLE (Pink Dark / Aesthetic Light)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const body = document.body;
  const savedTheme = localStorage.getItem('shuaib_theme') || 'theme-dark';

  body.className = savedTheme;
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = body.classList.contains('theme-dark');
      const nextTheme = isDark ? 'theme-light' : 'theme-dark';
      body.className = nextTheme;
      localStorage.setItem('shuaib_theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(isDark ? '☀️ Switched to Aesthetic Light mode' : '🌙 Switched to Pink Cyberpunk Dark mode');
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    const isLight = theme === 'theme-light';
    const icon = isLight ? '🌙' : '☀️';
    const label = isLight ? 'Dark' : 'Light';
    themeBtn.innerHTML = `<span class="theme-icon">${icon}</span> <span class="theme-label">${label}</span>`;
    themeBtn.title = isLight ? 'Switch to Pink Cyberpunk Dark Mode' : 'Switch to Aesthetic Light Mode';
  }
}

/* -------------------------------------------------------------
 * 2. TOPBAR NAVIGATION & SCROLL SPY
 * ------------------------------------------------------------- */
function initNavbar() {
  const topbar = document.querySelector('.canva-topbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const topbarNav = document.querySelector('.topbar-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      topbar?.classList.add('scrolled');
    } else {
      topbar?.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (mobileToggle && topbarNav) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = topbarNav.style.display === 'flex';
      topbarNav.style.display = isVisible ? 'none' : 'flex';
      topbarNav.style.flexDirection = 'column';
      topbarNav.style.position = 'absolute';
      topbarNav.style.top = '65px';
      topbarNav.style.left = '0';
      topbarNav.style.width = '100%';
      topbarNav.style.background = 'rgba(18, 19, 29, 0.95)';
      topbarNav.style.padding = '16px';
      topbarNav.style.borderRadius = '16px';
      topbarNav.style.border = '1px solid var(--glass-border)';
    });
  }
}

/* -------------------------------------------------------------
 * 3. INTERACTIVE PARTICLE CANVAS
 * ------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 45 : 20, 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(234, 0, 94, 0.35)' : 'rgba(108, 92, 231, 0.3)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(234, 0, 94, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* -------------------------------------------------------------
 * 4. PROJECT CATEGORY FILTER
 * ------------------------------------------------------------- */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. STATS ANIMATION OBSERVER
 * ------------------------------------------------------------- */
function initStatsObserver() {
  const statNumbers = document.querySelectorAll('.counter-anim');
  const progressBars = document.querySelectorAll('.lc-progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const lcSection = document.getElementById('leetcode');
  if (lcSection) observer.observe(lcSection);

  function animateNumbers() {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        el.textContent = currentVal.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(update);
    });
  }

  function animateBars() {
    progressBars.forEach(bar => {
      const pct = bar.getAttribute('data-percentage') || '0';
      bar.style.width = `${pct}%`;
    });
  }
}

/* -------------------------------------------------------------
 * 6. INTERACTIVE DEVELOPER TERMINAL
 * ------------------------------------------------------------- */
function initInteractiveTerminal() {
  const termBody = document.getElementById('terminalBody');
  const termInput = document.getElementById('terminalInput');
  const shortcutBtns = document.querySelectorAll('.term-pill-btn');

  const commands = {
    help: `Available commands:
  • about         - Overview of Ahmad Shuaib
  • skills        - Technical competencies & stack
  • jdbc          - JDBC & HikariCP connection pooling
  • rest          - RESTful API design & architecture
  • swagger       - OpenAPI 3.0 / Swagger UI documentation
  • gateway       - Spring Cloud API Gateway reactive ingress
  • microservices - Spring Boot + Netflix Eureka + AWS topology
  • architecture  - 1M+ visitors system design specifications
  • projects      - Featured architecture & AI repos
  • leetcode      - Competitive programming metrics
  • github        - Open source contributions
  • contact       - Communication channels & email
  • clear         - Clear terminal window`,
    about: `Ahmad Shuaib — Electronics & Communication Engineering Scholar (Chennai, India)
Role: Backend & AI Developer with deep focus on Java, Spring Boot & Distributed Systems
Philosophy: "One Debug, Infinite Realms."
Seeking: High-impact software engineering roles, intern quests & dev duels.`,
    skills: `LANGUAGES: Java (Core, Collections, Threads), C++, Python, JavaScript (ES6+), PHP
FRAMEWORKS: Spring Boot 3, Netflix Eureka, Spring Cloud Gateway, Resilience4j, Hibernate
PERSISTENCE: JDBC, HikariCP, MySQL, PostgreSQL, Redis Caching, SQLite
CONTRACTS: RESTful APIs, OpenAPI 3.0 / Swagger UI, JSON Schema
DEVOPS & CLOUD: AWS (ECS, RDS, S3, CloudFront), Docker, Terraform (IaC), Git/GitHub, n8n`,
    jdbc: `JDBC & Connection Pool Architecture:
1. Pool: HikariCP (maximumPoolSize=30, minimumIdle=10, connectionTimeout=20s). Zero lock contention.
2. Safety: PreparedStatement with typed parameters (pstmt.setLong, pstmt.setString) eliminates SQL Injection.
3. Transactions: Explicit ACID control via conn.setAutoCommit(false), conn.commit(), and conn.rollback().
4. Memory: Streaming ResultSets with setFetchSize(1000) avoids OutOfMemory heap crashes.`,
    rest: `RESTful API Architecture:
1. Richardson Maturity Level 3 with resource-based URI hierarchy.
2. HTTP Verbs: GET (Fetch 200), POST (Create 201), PUT (Update 200), DELETE (204 No Content).
3. Error Handling: Global @RestControllerAdvice with structured ProblemDetail (RFC 7807).
4. Validation: Jakarta Bean Validation (@NotNull, @Size, @Valid) at controller entry points.`,
    swagger: `Swagger & OpenAPI 3.0 Integration:
1. Dependency: org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0
2. Endpoints: Interactive UI at /swagger-ui.html, Schema JSON at /v3/api-docs.
3. Annotations: @Tag, @Operation, @ApiResponse, @SecurityRequirement(bearerAuth).`,
    gateway: `Spring Cloud API Gateway:
1. Reactive Netty non-blocking WebFlux ingress handling 50K+ connections.
2. Route Predicates (Path, Method, Headers) & Filter Factories (Pre/Post).
3. JwtAuthenticationFilter: Validates RSA256 tokens and injects X-User-Id.
4. RedisRateLimiter: Token-bucket algorithm (replenishRate=25, burstCapacity=50).
5. Dynamic routing to Eureka service instances: lb://DSA-SERVICE.`,
    microservices: `Enterprise Microservices Topology:
1. Netflix Eureka Server: Service Registry & Discovery (@EnableEurekaServer). Client-side load balancing.
2. Spring Cloud Gateway: Central reactive ingress, JWT token validation, rate-limiting filters.
3. Resilience4j: Circuit Breakers (CLOSED/OPEN/HALF-OPEN), fallback methods, bulkhead isolation.
4. AWS Deployment: Multi-AZ AWS ECS Fargate, AWS RDS MySQL with read replicas, Route53, and CloudFront.`,
    aws: `AWS Cloud Stack:
  • AWS ECS Fargate: Serverless Docker microservice execution
  • AWS RDS Multi-AZ Aurora MySQL: ACID compliant data layer
  • AWS CloudFront + S3: Sub-25ms global edge asset caching
  • AWS Application Load Balancer & Route 53: High availability & SSL termination`,
    projects: `1. LeetCode Patterns Platform (Live: leetcode-patterns-platform-jqfj.vercel.app)
2. Ai-Companion-Argos (Java event-driven conversational companion)
3. Ai-Projects-for-Hackathons (50 Pure JS & Java AI implementations)
4. Eternity-AI (Stock market trend analysis & trading timing)
5. JARVIS-Voice-Assistant (Python/PyQt6 + Gemini AI voice system)
6. Job-Hunt 1.0 (Automated job search engine powered by Claude Code)
7. n8n-automation-projects (10 production-ready event workflows)`,
    leetcode: `Profile: https://leetcode.com/u/x_drxzx_x/
Total Solved: 445+ Questions
  - Easy: 125 Solved
  - Medium: 232 Solved (Primary algorithmic focus)
  - Hard: 88 Solved
Global Ranking: Top Tier (~273,952)
Streak: 200-Day Active Storm`,
    github: `GitHub: https://github.com/drxzx7
Public Repositories: 16+
Core Focus: Scalable Backends, AI Tooling & Infrastructure Automation`,
    architecture: `System Design for 1,000,000+ Daily Visitors:
1. Edge Caching & Anycast CDN: Static HTML/CSS/JS served with Stale-While-Revalidate (TTFB < 25ms).
2. Rate Limiting: IP-based sliding window prevents DDoS & brute force (HTTP 429).
3. CSRF & Honeypot: Anti-spam bot protection without user CAPTCHA friction.
4. Atomic Locks: Concurrent message logging using flock(LOCK_EX) ensures zero race conditions.`,
    contact: `Direct Email: mssdkkl@gmail.com (Gmail: https://mail.google.com/mail/u/0/#inbox)
LinkedIn:     https://linkedin.com/in/ahmad-shuaib-75543037a
GitHub:       https://github.com/drxzx7
LeetCode:     https://leetcode.com/u/x_drxzx_x/`,
    clear: ''
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim();
    const cmd = rawCmd.toLowerCase();

    // Append Command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `<span class="term-prompt">drxzx7@shuaib:~$</span> <span class="term-cmd">${escapeHTML(rawCmd)}</span>`;
    termBody.appendChild(cmdLine);

    if (cmd === 'clear') {
      termBody.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'term-line term-output';

    if (commands[cmd]) {
      outputLine.textContent = commands[cmd];
    } else if (cmd === '') {
      // blank
    } else {
      outputLine.textContent = `bash: command not found: ${rawCmd}. Type "help" for a list of valid commands.`;
    }

    termBody.appendChild(outputLine);
    termBody.scrollTop = termBody.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        if (val.trim()) {
          executeCommand(val);
          termInput.value = '';
        }
      }
    });
  }

  shortcutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

/* -------------------------------------------------------------
 * 7. SMOOTH SCROLLING HELPER
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* -------------------------------------------------------------
 * 8. TOAST NOTIFICATION HELPER
 * ------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✨'}</span> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}



/* ============================================================
   🧪 INTERACTIVE API EXPLORER & SWAGGER SANDBOX CONTROLLER
   ============================================================ */
function initApiExplorer() {
  const endpointPills = document.querySelectorAll('.api-endpoint-pill');
  const methodBadge = document.getElementById('apiMethodBadge');
  const urlDisplay = document.getElementById('apiUrlDisplay');
  const statusBadge = document.getElementById('apiStatusBadge');
  const latencyBadge = document.getElementById('apiLatencyBadge');
  const responseViewer = document.getElementById('apiResponseViewer');
  const sendBtn = document.getElementById('apiSendBtn');
  const requestBodyInput = document.getElementById('apiRequestBody');

  const endpointData = {
    'problems': {
      method: 'GET',
      badgeClass: 'rest-get',
      url: '/api/v1/problems?page=1&size=3&category=SLIDING_WINDOW',
      payload: '',
      sampleResponse: {
        status: 200,
        message: "Problems fetched successfully from LeetCode Patterns Engine",
        page: 1,
        totalItems: 100,
        data: [
          {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "MEDIUM",
            pattern: "Sliding Window",
            optimalComplexity: { time: "O(n)", space: "O(min(m, n))" },
            solutions: ["Java", "C++", "Python", "JavaScript"]
          },
          {
            id: 76,
            title: "Minimum Window Substring",
            difficulty: "HARD",
            pattern: "Sliding Window",
            optimalComplexity: { time: "O(m + n)", space: "O(m + n)" },
            solutions: ["Java", "C++", "Python", "JavaScript"]
          }
        ]
      }
    },
    'health': {
      method: 'GET',
      badgeClass: 'rest-get',
      url: '/actuator/health',
      payload: '',
      sampleResponse: {
        status: "UP",
        components: {
          db: { status: "UP", details: { database: "MySQL", connectionPool: "HikariCP-1 (active=3, idle=17)" } },
          diskSpace: { status: "UP", details: { totalBytes: 512000000000, freeBytes: 384000000000 } },
          eureka: { status: "UP", details: { serviceUrl: "http://eureka-server:8761/eureka", leaseRenewal: "OK" } },
          redis: { status: "UP", details: { version: "7.2.4", ping: "PONG" } }
        }
      }
    },
    'execute': {
      method: 'POST',
      badgeClass: 'rest-post',
      url: '/api/v1/dsa/execute',
      payload: JSON.stringify({
        problemId: 445,
        language: "JAVA_21",
        sourceCode: "class Solution { public int[] twoSum(int[] nums, int target) { ... } }"
      }, null, 2),
      sampleResponse: {
        status: 200,
        executionId: "exec_98f4a1c0",
        verdict: "ACCEPTED",
        testCasesPassed: "3/3 (100%)",
        metrics: {
          runtimeMs: 1.4,
          memoryMb: 42.1,
          percentileBeaten: "96.4%"
        },
        workerThread: "dsa-runner-worker-pool-4"
      }
    },
    'eureka': {
      method: 'GET',
      badgeClass: 'rest-get',
      url: '/eureka/apps',
      payload: '',
      sampleResponse: {
        applications: {
          application: [
            { name: "AUTH-SERVICE", instances: [{ instanceId: "auth-1:8081", status: "UP", ipAddr: "10.0.1.42" }] },
            { name: "DSA-CORE-SERVICE", instances: [{ instanceId: "dsa-1:8082", status: "UP", ipAddr: "10.0.1.88" }] },
            { name: "USER-SERVICE", instances: [{ instanceId: "user-1:8083", status: "UP", ipAddr: "10.0.1.104" }] }
          ]
        }
      }
    },
    'stats': {
      method: 'GET',
      badgeClass: 'rest-get',
      url: '/api/stats',
      payload: '',
      sampleResponse: {
        developer: "Ahmad Shuaib (@drxzx7)",
        leetcode: { solved: "445+", rank: "#273,952", streak: "200 Days" },
        systemDesign: { scale: "1M+ Daily Visitors", edgeTTFB: "< 25ms" }
      }
    }
  };

  let currentKey = 'problems';

  endpointPills.forEach(pill => {
    pill.addEventListener('click', () => {
      endpointPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentKey = pill.getAttribute('data-endpoint') || 'problems';
      const item = endpointData[currentKey];
      if (item) {
        if (methodBadge) {
          methodBadge.textContent = item.method;
          methodBadge.className = `rest-badge ${item.badgeClass}`;
        }
        if (urlDisplay) urlDisplay.textContent = item.url;
        if (requestBodyInput) requestBodyInput.value = item.payload;
        if (statusBadge) statusBadge.textContent = 'Ready';
        if (latencyBadge) latencyBadge.textContent = '-- ms';
        if (responseViewer) responseViewer.textContent = '// Click "Execute Request" to send live call...';
      }
    });
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const item = endpointData[currentKey];
      if (!item) return;

      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span>⏳</span> <span>Executing...</span>';
      if (statusBadge) statusBadge.textContent = 'Transmitting...';

      const simulatedLatency = Math.floor(Math.random() * 25) + 12; // 12ms - 37ms

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<span>🚀</span> <span>Execute Request</span>';
        if (statusBadge) {
          statusBadge.innerHTML = '<span style="color: #10b981; font-weight: 800;">200 OK</span>';
        }
        if (latencyBadge) {
          latencyBadge.innerHTML = `<span style="color: #00d2d3;">⚡ ${simulatedLatency}ms</span>`;
        }
        if (responseViewer) {
          responseViewer.textContent = JSON.stringify(item.sampleResponse, null, 2);
        }
        showToast(`HTTP 200 OK — ${item.url} (${simulatedLatency}ms)`, 'success');
      }, 350);
    });
  }
}

/* ============================================================
   📈 1M+ TRAFFIC & DISTRIBUTED STRESS TEST SIMULATOR
   ============================================================ */
function initTrafficSimulator() {
  const rpsSlider = document.getElementById('simRpsSlider');
  const cacheSlider = document.getElementById('simCacheSlider');
  const faultToggle = document.getElementById('simFaultToggle');

  const rpsDisplay = document.getElementById('simRpsDisplay');
  const cacheDisplay = document.getElementById('simCacheDisplay');

  const metricOffload = document.getElementById('metricOffload');
  const metricOriginLoad = document.getElementById('metricOriginLoad');
  const metricLatency = document.getElementById('metricLatency');
  const metricDbOps = document.getElementById('metricDbOps');
  const metricCbStatus = document.getElementById('metricCbStatus');

  function recalculateMetrics() {
    const totalRps = parseInt(rpsSlider?.value || '10000', 10);
    const cacheHitPct = parseFloat(cacheSlider?.value || '98.5');
    const isFaultInjected = faultToggle?.checked || false;

    if (rpsDisplay) rpsDisplay.textContent = `${totalRps.toLocaleString()} RPS`;
    if (cacheDisplay) cacheDisplay.textContent = `${cacheHitPct}%`;

    const cacheOffloadRps = Math.floor(totalRps * (cacheHitPct / 100));
    const originRps = totalRps - cacheOffloadRps;

    // Latency calculation: Edge takes ~15ms, origin takes ~38ms
    const avgLatency = ((cacheOffloadRps * 15 + originRps * 42) / totalRps).toFixed(1);

    // Database writes (15% of origin) & reads (85% of origin)
    const dbWrites = Math.floor(originRps * 0.15);
    const dbReads = Math.floor(originRps * 0.85);

    if (metricOffload) metricOffload.textContent = `${cacheHitPct}%`;
    if (metricOriginLoad) metricOriginLoad.textContent = `${originRps.toLocaleString()} RPS`;
    if (metricLatency) metricLatency.textContent = `${avgLatency} ms`;
    if (metricDbOps) metricDbOps.textContent = `${dbWrites}w / ${dbReads}r`;

    if (metricCbStatus) {
      if (isFaultInjected) {
        metricCbStatus.innerHTML = '<span style="color: #ef4444; font-weight: 800;">OPEN (Fallback)</span>';
      } else {
        metricCbStatus.innerHTML = '<span style="color: #10b981; font-weight: 800;">CLOSED (Healthy)</span>';
      }
    }
  }

  rpsSlider?.addEventListener('input', recalculateMetrics);
  cacheSlider?.addEventListener('input', recalculateMetrics);
  faultToggle?.addEventListener('change', recalculateMetrics);

  recalculateMetrics();
}

/* ============================================================
   📄 RESUME / CV MODAL CONTROLLER
   ============================================================ */
function initResumeModal() {
  const modalOverlay = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('[data-open-modal="resumeModal"]');
  const closeBtn = document.getElementById('closeResumeModal');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeBtn?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
