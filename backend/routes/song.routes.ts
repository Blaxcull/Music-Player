import { Router } from 'express';
import { uploadSongURL } from '../controllers/uploadSongURL.controller';
import { getAllSongs } from '../controllers/getAllSongs.controller';
import { likeClicked } from '../controllers/likeClicked.controller';
import { getLikedSongs } from '../controllers/getLikedSongs.controller';


const router = Router();

// generate signed url for each song and cover
// insert into mongodb
router.post('/uploadSongURL', uploadSongURL);
router.post('/isLikedClicked',likeClicked);
router.get('/fetchAllSongs', getAllSongs);
router.get('/fetchLikedSongs', getLikedSongs);

export default router;
