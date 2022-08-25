import express from 'express';
import { login, signup } from '../controllers/steamAuth.controller.js';

const router = express.Router();

router.post('/stream-signup', signup);

router.post('/stream-login', login);

export default router;