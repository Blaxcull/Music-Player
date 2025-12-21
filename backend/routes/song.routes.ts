import { Router } from 'express';
import { uploadSongURL } from '../controllers/uploadSongURL.controller.ts';

const router = Router();

// generate signed url for each song and cover
// insert into mongodb
router.post('/uploadSongURL', uploadSongURL);

export default router;
