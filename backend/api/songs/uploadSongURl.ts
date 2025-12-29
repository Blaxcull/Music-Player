import { getSignedURL } from '../../GenerateSignedURL.ts';
import clientPromise from '../../config/db.ts';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { songName, titleList, artistList, durationList, dateList, userID } = req.body;

  if (!songName || !titleList || !artistList || !durationList || !dateList || !userID) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const SignedSongURLList: string[] = [];
    const SignedCoverURLList: string[] = [];

    // Generate signed URLs for each song
    for (const song of songName) {
      const SignedURL = await getSignedURL(song);
      SignedSongURLList.push(SignedURL.success.song);
      SignedCoverURLList.push(SignedURL.success.cover);
    }

    // Insert into MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    for (let i = 0; i < SignedSongURLList.length; i++) {
      const songData = {
        UserID: userID,
        SignedSongURL: SignedSongURLList[i],
        SignedCoverURL

