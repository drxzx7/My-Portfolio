/**
 * Vercel Serverless Function: /api/stats
 */
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  res.status(200).json({
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
  });
};
