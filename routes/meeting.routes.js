import express from 'express';
import { CreateMeeting, deleteMeeting, getAllMeeting } from '../controllers/meeting.controller.js';

const router = express.Router();

// Create a Meeting
router.get('/', getAllMeeting);
router.post('/', CreateMeeting);
router.delete('/:id', deleteMeeting);


export default router;