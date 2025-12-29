import type { Request, Response } from "express";
import clientPromise from "../config/db.ts";

export const getAllSongs = async (_req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("SignedURLs");

    const songs = await collection.find({ UserID: 1 }).toArray();
    res.json(songs);
  } catch (err) {
    console.error("FETCH SONGS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};

