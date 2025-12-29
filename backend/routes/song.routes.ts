import { Router } from 'express';
import { uploadSongURL } from '../controllers/uploadSongURL.controller.ts';
import { getAllSongs } from '../controllers/getAllSongs.controller.ts';
import { likeClicked } from '../controllers/likeClicked.controller.ts';
import { getLikedSongs } from '../controllers/getLikedSongs.controller.ts';


const router = Router();

// generate signed url for each song and cover
// insert into mongodb
router.post('/uploadSongURL', uploadSongURL);
router.post('/isLikedClicked',likeClicked);
router.get('/fetchAllSongs', getAllSongs);
router.get('/fetchLikedSongs', getLikedSongs);

export default router;
