import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCors } from '../config/cors.ts';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;

  res.status(200).json({ ok: true });
}

