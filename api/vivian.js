/**
 * Vercel Serverless Function: /api/vivian
 */
const { generateVivianMultiModelResponse } = require('../js/vivian-engine.js');

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
      data = {};
    }
  }
  data = data || {};

  const prompt = String(data.prompt || '').trim();
  const modelKey = String(data.model || 'gemini-3.8-flash').toLowerCase().trim();

  if (!prompt) {
    return res.status(422).json({ status: 'error', message: 'Prompt parameter required.' });
  }

  try {
    const result = generateVivianMultiModelResponse(prompt, modelKey);
    return res.status(200).json({
      status: 'success',
      role: result.role,
      engine: result.engine,
      response: result.response
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to process AI response: ' + err.message
    });
  }
};
