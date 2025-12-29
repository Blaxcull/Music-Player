import type { Request, Response } from 'express';
import client from '../config/db';
import { ObjectId } from 'mongodb';


export const likeClicked = async (req: Request, res: Response) => {
  try {
    await client.connect();
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
