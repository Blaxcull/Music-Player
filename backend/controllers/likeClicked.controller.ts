import type { Request, Response } from 'express';
import clientPromise from '../config/db.ts';
import { ObjectId } from 'mongodb';


export const likeClicked = async (req: Request, res: Response) => {
  try {
      const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    const SongID =  new ObjectId(req.body.songID);
    const Liked = req.body.liked;
    
    await collection.updateOne(
      { _id: SongID },
      { $set: { Liked: Liked } }
    );

    res.json({ message: 'Song liked' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};
