import type { VercelResponse, VercelRequest } from '@vercel/node';

export function setCors(req: VercelRequest, res: VercelResponse) {
  // Get allowed origins from environment variable (comma-separated)
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedOriginsEnv.split(',').map(origin => origin.trim());

  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // request handled
  }

  return false; // normal flow
}

