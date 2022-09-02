import express from 'express';
import { getAllStory, StoryPost } from '../controllers/story.controller.js';

const router = express.Router();

// Create a feedPost
router.get('/', getAllStory);
router.post('/storyPost', StoryPost);


export default router;