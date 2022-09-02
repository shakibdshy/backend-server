import express from 'express';
import { commentFeed, deleteFeed, feedPost, getAllFeed, likeFeed, updateFeed } from '../controllers/feed.controller.js';

const router = express.Router();

// Create a feedPost
router.get('/', getAllFeed);
router.post('/', feedPost);
router.put('/:id', updateFeed);
router.put('/like/:id', likeFeed);
router.put('/comment/:id', commentFeed);
router.delete('/:id', deleteFeed);


export default router;