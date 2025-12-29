import clientPromise from '../../config/db.ts';
import { ObjectId } from 'mongodb';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    const { songID, liked } = req.body;

    if (!songID || liked === undefined) {
      return res.status(400).json({ error: 'Missing songID or liked value' });
    }

    const SongID = new ObjectId(songID);

    await collection.updateOne(
      { _id: SongID },
      { $set: { Liked: liked } }
    );

    res.status(200).json({ message: 'Song liked status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update song liked status' });
  }
}

