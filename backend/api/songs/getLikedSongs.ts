import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../../config/db.js';
import { setCors } from '../../config/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (setCors(req, res)) {
        return;
    }
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    const songs = await collection.find({ UserID: 1, Liked: true }).toArray();
    res.status(200).json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch liked songs' });
  }
}

