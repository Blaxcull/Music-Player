// /api/songs/fetchAllSongs.ts
import clientPromise from '../../config/db.ts';

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');
    const songs = await collection.find({ UserID: 1 }).toArray();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
}

