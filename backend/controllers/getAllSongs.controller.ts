import type { Request, Response } from 'express';
import client from '../config/db';

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');
    const songs = await collection.find({UserID: 1}).toArray();
    console.log(songs);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};
