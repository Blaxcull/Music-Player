import { Router } from 'express';
import { uploadSongURL } from '../controllers/uploadSongURL.controller.ts';
import { getAllSongs } from '../controllers/getAllSongs.controller.ts';

const router = Router();

// generate signed url for each song and cover
// insert into mongodb
router.post('/uploadSongURL', uploadSongURL);
router.get('/fetchAllSongs', getAllSongs);

export default router;
