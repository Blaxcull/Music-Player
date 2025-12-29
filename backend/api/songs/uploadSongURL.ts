import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSignedURL } from '../../GenerateSignedURL.js';
import clientPromise from '../../config/db.js';
import { setCors } from '../../config/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (setCors(req, res)) return;
  try {

    const SignedSongURLList: string[] = [];
    const SignedCoverURLList: string[] = [];

    const { songName, titleList, artistList, durationList, dateList, userID } = req.body;

    for (const song of songName) {
      const SignedURL = await getSignedURL(song);
      SignedSongURLList.push(SignedURL.success.song);
      SignedCoverURLList.push(SignedURL.success.cover);
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    for (let i = 0; i < SignedSongURLList.length; i++) {
      const songData = {
        UserID: userID,
        SignedSongURL: SignedSongURLList[i],
        SignedCoverURL: SignedCoverURLList[i],
        Title: titleList[i],
        Artist: artistList[i],
        Duration: durationList[i],
        Date: dateList[i],
      };

      await collection.insertOne(songData);
    }

    res.status(200).json({
      message: 'Songs uploaded successfully',
      SignedSongURLList,
      SignedCoverURLList,
      count: songName.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload songs' });
  }
}

