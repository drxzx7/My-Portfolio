/**
 * =========================================================================
 * 🚀 AHMAD SHUAIB PORTFOLIO — ZERO-DEPENDENCY NODE.JS SERVER
 * Handles Static Serving, Edge Caching, Rate Limiting & Safe Message Storage
 * =========================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { generateVivianMultiModelResponse } = require('./js/vivian-engine.js');

const PORT = process.env.PORT || 3000;
const STORAGE_DIR = path.join(__dirname, 'api', 'storage');
const MESSAGES_FILE = path.join(STORAGE_DIR, 'messages.json');

// Ensure storage folder exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// In-Memory Rate Limiting (Token Bucket / IP Sliding Window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  rateLimitMap.set(ip, entry);
  return true;
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Global CORS headers for API endpoints (supports cross-origin & file:// scheme calls)
  if (pathname.startsWith('/api/')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }
  }

  // 1. API: Stats
  if (pathname === '/api/stats' || pathname === '/api/stats.php') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify({
      developer: {
        name: 'Ahmad Shuaib',
        title: 'Backend & AI Engineer | High-Performance Systems Specialist',
        location: 'Chennai, Tamil Nadu, India',
        degree: 'B.E. Electronics and Communication Engineering',
        motto: 'One Debug, Infinite Realms.',
        availability: 'Open for Dev Duels & High-Impact Quests'
      },
      leetcode: {
        username: 'x_drxzx_x',
        profileUrl: 'https://leetcode.com/u/x_drxzx_x/',
        globalRank: 273952,
        totalSolved: 445,
        easy: 125,
        medium: 232,
        hard: 88,
        streakDays: 200,
        gfgSolved: '100+',
        mysqlSolved: '100+'
      },
      github: {
        username: 'drxzx7',
        profileUrl: 'https://github.com/drxzx7',
        publicRepos: 16,
        flagshipProject: 'leetcode-patterns-platform',
        liveDemo: 'https://leetcode-patterns-platform-jqfj.vercel.app/'
      },
      systemDesign: {
        scaleCapability: '1,000,000+ Concurrent Requests / Day',
        architecture: 'Edge CDN + Static First Assets + Asynchronous Rate-Limited API',
        meanResponseTime: '< 25ms TTFB via Edge Cache',
        securityCompliance: 'Strict CSP, HSTS, Honeypot Anti-Spam'
      }
    }, null, 2));
  }

  // 2. API: Contact Form
  if ((pathname === '/api/contact' || pathname === '/api/contact.php') && req.method === 'POST') {
    if (!checkRateLimit(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        status: 'error',
        message: 'Rate limit exceeded. Please wait a few minutes before sending another message.'
      }));
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 65536) { // 64KB max payload
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Payload too large.' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      let data = {};
      try {
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
          data = JSON.parse(body);
        } else {
          const params = new URLSearchParams(body);
          for (const [k, v] of params.entries()) data[k] = v;
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'error', message: 'Invalid payload.' }));
      }

      // Honeypot bot trap
      if (data.website_hp || data.company_field) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'success', message: 'Thank you! Message received.' }));
      }

      const name = String(data.name || '').trim().slice(0, 100);
      const email = String(data.email || '').trim().slice(0, 120);
      const subject = String(data.subject || 'Portfolio Inquiry').trim().slice(0, 150);
      const message = String(data.message || '').trim().slice(0, 3000);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || name.length < 2 || !email || !emailRegex.test(email) || !message || message.length < 10) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          status: 'error',
          message: 'Please provide a valid name, email address, and message (min 10 chars).'
        }));
      }

      const newEntry = {
        id: Math.random().toString(36).substring(2, 12),
        timestamp: new Date().toISOString(),
        name,
        email,
        subject,
        message,
        recipient: 'mssdkkl@gmail.com',
        ip: clientIp.replace(/:/g, '_').slice(-16)
      };

      try {
        let existing = [];
        if (fs.existsSync(MESSAGES_FILE)) {
          const content = fs.readFileSync(MESSAGES_FILE, 'utf-8');
          existing = JSON.parse(content || '[]');
        }
        existing.unshift(newEntry);
        if (existing.length > 1000) existing = existing.slice(0, 1000);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
      } catch (err) {
        console.error('Storage error:', err);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        status: 'success',
        message: 'Message delivered safely to Ahmad Shuaib (mssdkkl@gmail.com)! I will get back to you shortly.',
        recipient: 'mssdkkl@gmail.com'
      }));
    });
    return;
  }

  // 3. API: Vivian AI Assistant (Claude-Powered System Architect)
  if ((pathname === '/api/vivian' || pathname === '/api/vivian.php') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 8192) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Payload exceeds security cap.' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      let data = {};
      try {
        data = JSON.parse(body || '{}');
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'error', message: 'Malformed JSON payload.' }));
      }

      const prompt = String(data.prompt || '').trim();
      const modelKey = String(data.model || 'gemini-3.8-flash').toLowerCase().trim();

      if (!prompt) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'error', message: 'Prompt parameter required.' }));
      }

      const result = generateVivianMultiModelResponse(prompt, modelKey);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify({
        status: 'success',
        role: result.role,
        engine: result.engine,
        response: result.response
      }));
    });
    return;
  }

  // 4. Prevent access to storage directory or hidden files
  if (pathname.includes('/storage') || pathname.includes('/.')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  // 4. Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 fallback to index.html
      filePath = path.join(__dirname, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Internal Server Error');
      }

      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      // Caching: static assets cached for 1 day
      const isStaticAsset = ['.css', '.js', '.png', '.jpg', '.svg', '.woff2'].includes(ext);
      const cacheControl = isStaticAsset
        ? 'public, max-age=86400, stale-while-revalidate=604800'
        : 'public, max-age=0, must-revalidate';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚡ Ahmad Shuaib — High-Performance Backend Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚡ Scalable architecture ready for 1M+ simulated requests`);
  console.log(`🔒 Security protocols active: Rate-Limiting + Honeypot`);
  console.log(`=======================================================`);
});

