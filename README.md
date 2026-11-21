# ⚡ Ahmad Shuaib — High-Performance Backend & Systems Portfolio
> **Backend & AI Engineer | High-Performance Systems & DSA Specialist**  
> GitHub: [@drxzx7](https://github.com/drxzx7) • LeetCode: [@x_drxzx_x](https://leetcode.com/u/x_drxzx_x/) • LinkedIn: [ahmad-shuaib-75543037a](https://www.linkedin.com/in/ahmad-shuaib-75543037a)

---

## 🌟 Highlights & Features
- **Sliding Tech Stack Ribbon**: Dual-direction infinite marquee ticker showcasing Spring Boot 3, Eureka, AWS, Java, Microservices, Docker, Redis, and MySQL with pause-on-hover and edge fade gradients.
- **Enterprise Spring Boot & Eureka Microservices Architecture**: Detailed blueprint with Netflix Eureka service discovery, Spring Cloud API Gateway, Resilience4j circuit breakers, and AWS production cloud infrastructure (ECS Fargate, RDS Multi-AZ, CloudFront, Route 53).
- **Authentic Make.com + Canva Pink Aesthetic Design System**: Deep cyberpunk space palette (`#0b0c13`), energetic magenta accents (`#ea005e`), frosted glassmorphic navigation, ambient floating glows, and responsive canvas particle interactions.
- **1,000,000+ Visitor System Design**: Static-first edge caching architecture with decoupled microservices, sub-25ms TTFB, and zero single points of failure.
- **Enterprise PHP Hardening**:
  - Sliding-window IP rate limiting (HTTP 429 mitigation)
  - Multi-tier honeypot and sub-2-second bot heuristics
  - Strict input sanitization (UTF-8 normalization, null-byte eradication)
  - Mandatory security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
  - Atomic file locking (`flock(LOCK_EX)`) to prevent race conditions
- **LeetCode & Competitive Coding Dojo**:
  - Direct integration showcasing real-time metrics: 445+ problems solved (125 Easy, 232 Medium, 88 Hard)
  - Global ranking (~Top 8%) and 200-day active problem solving storm
- **Interactive Developer Terminal Sandbox**:
  - Functional bash console emulator supporting `help`, `about`, `skills`, `microservices`, `aws`, `projects`, `leetcode`, `architecture`, `contact`, and `clear`.
- **Dual Backend Support**:
  - Works out-of-the-box with **PHP (Apache/Nginx)** OR **Node.js (`node server.js`)**.

---

## 🚀 Quick Start (Local Development)

### Option A: Run with Node.js (Zero Dependencies)
```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Run with PHP Built-in Server
```bash
php -S localhost:8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📂 Project Structure

```
Shuaib Portfolio/
├── index.html              # Main high-performance semantic portfolio page
├── server.js               # Zero-dependency Node.js server with rate limiter & API
├── package.json            # NPM scripts & metadata
├── SYSTEM_DESIGN.md        # 1M+ traffic system design & security documentation
├── README.md               # Setup and architecture documentation
├── css/
│   └── style.css           # Make.com + Pink Cyberpunk design system
├── js/
│   ├── main.js             # Theme switcher, scroll spy, particles, terminal, stats
│   └── contact.js          # Secure contact handler with honeypot & fallback
└── api/
    ├── contact.php         # Hardened PHP contact API with rate limit & atomic lock
    ├── stats.php           # Cached stats API with ETag and Stale-While-Revalidate
    ├── .htaccess           # Apache security headers & folder protection
    └── storage/
        ├── .htaccess       # Deny all direct HTTP requests
        └── messages.json   # Protected message repository
```

---

## 🌐 Production Deployment

### 1. Vercel / Netlify / Cloudflare Pages
- Push the repository to GitHub.
- Connect your GitHub repository to Vercel/Netlify.
- The static frontend works immediately with global Edge CDN caching.

### 2. Traditional LAMP / LEMP Server (Apache / Nginx + PHP)
- Upload all files into `/var/www/html/` or public web root.
- Ensure the `api/storage` directory has write permissions (`chmod 750 api/storage`).
- The `.htaccess` file automatically secures all internal storage and enforces strict headers.

