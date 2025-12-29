// controllers/songs.controller.ts
import type { Request, Response } from 'express';
import { getSignedURL } from '../GenerateSignedURL';
import client from '../config/db';
import dotenv from 'dotenv';
dotenv.config(); //




// generate signed url for each song and cover
export const uploadSongURL = async (req: Request, res: Response) => {
  try {
const SignedSongURLList: Array<string> = [];
const SignedCoverURLList: Array<string> = [];

console.log(req.body);


    for (const song of req.body.songName) {

      const SignedURL = await getSignedURL(song);
      SignedSongURLList.push(SignedURL.success.song);
      SignedCoverURLList.push(SignedURL.success.cover);
    }


// insert into mongodb
async function insertData() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME!);
    const collection = db.collection('SignedURLs');

    console.log("connected to db");

    for ( let i = 0; i < SignedSongURLList.length; i++) {
        console.log(req.body.titleList[i]);
      const song = SignedSongURLList[i];
      const cover = SignedCoverURLList[i];
      const title = req.body.titleList[i];
      const artist = req.body.artistList[i];
      const duration = req.body.durationList[i];
      const date = req.body.dateList[i];

      const songData = {
        UserID: req.body.userID,
        SignedSongURL: song,
        SignedCoverURL: cover,
        Title: title,
        Artist: artist,
        Duration: duration,
        Date: date,
      };
      console.log(songData);

      await collection.insertOne(songData);
      console.log(songData);
    }
  }
  catch (err) {
    console.log(err);
  }
  finally {
    await client.close();
  }
}
insertData();




    res.json({ message: "Songs received",
             SignedSongURLList: SignedSongURLList,
             SignedCoverURLList: SignedCoverURLList,
             count: req.body.length });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

