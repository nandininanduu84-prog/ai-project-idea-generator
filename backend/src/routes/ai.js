import express from 'express';
import { refineProjectIdea, chatAboutProject } from '../controllers/aiController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/refine', refineProjectIdea);
router.post('/chat', chatAboutProject);

export default router;
