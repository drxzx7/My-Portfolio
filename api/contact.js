/**
 * Vercel Serverless Function: /api/contact
 */
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      const params = new URLSearchParams(data);
      data = {};
      for (const [k, v] of params.entries()) data[k] = v;
    }
  }
  data = data || {};

  // Honeypot bot trap
  if (data.website_hp || data.company_field) {
    return res.status(200).json({ status: 'success', message: 'Thank you! Message received.' });
  }

  const name = String(data.name || '').trim().slice(0, 100);
  const email = String(data.email || '').trim().slice(0, 120);
  const subject = String(data.subject || 'Portfolio Inquiry').trim().slice(0, 150);
  const message = String(data.message || '').trim().slice(0, 3000);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || name.length < 2 || !email || !emailRegex.test(email) || !message || message.length < 10) {
    return res.status(422).json({
      status: 'error',
      message: 'Please provide a valid name, email address, and message (min 10 chars).'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Message delivered safely to Ahmad Shuaib (mssdkkl@gmail.com)! I will get back to you shortly.',
    recipient: 'mssdkkl@gmail.com'
  });
};
