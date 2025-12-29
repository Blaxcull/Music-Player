import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../../config/db.js';
import { setCors } from '../../config/cors.js';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (setCors(req, res)) return;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    console.log("hello");
    const SongID = new ObjectId(req.body.songID);
    const Liked = req.body.liked;

    await collection.updateOne({ _id: SongID }, { $set: { Liked } });
    res.status(200).json({ message: 'Song liked status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update liked status' });
  }
}

