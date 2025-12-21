// controllers/songs.controller.ts
import type { Request, Response } from 'express';
import { getSignedURL } from '../GenerateSignedURL.ts';
import clientPromise from '../config/db.ts';



export const uploadSongURL = async (req: Request, res: Response) => {
  try {
const SignedSongURLList: Array<string> = [];
const SignedCoverURLList: Array<string> = [];
// generate signed url for each song and cover
// insert into mongodb



    for (const song of req.body.songName) {

      const SignedURL = await getSignedURL(song);
      SignedSongURLList.push(SignedURL.success.song);
      SignedCoverURLList.push(SignedURL.success.cover);
    }

    res.json({ message: "Songs received",
             SignedSongURLList: SignedSongURLList,
             SignedCoverURLList: SignedCoverURLList,
             count: req.body.length });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

