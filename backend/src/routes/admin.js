import express from 'express';
import { getDashboardStats, getAllUsers, deleteUser, deleteInappropriateProject } from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.delete('/projects/:projectId', deleteInappropriateProject);

export default router;
