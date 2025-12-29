import type { VercelResponse, VercelRequest } from '@vercel/node';

export function setCors(req: VercelRequest, res: VercelResponse) {
  // Allow local frontend and production frontend
  const allowedOrigins = [
    'http://localhost:5173',
    'https://music-player-qudj.vercel.app'
  ];

  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // indicates that request was handled
  }

  return false; // indicates normal flow
}

