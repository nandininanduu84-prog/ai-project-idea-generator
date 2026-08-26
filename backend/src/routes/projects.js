import express from 'express';
import { validateGenerateProject } from '../middleware/validation.js';
import {
  generateProjectIdeas,
  getAllProjects,
  getProjectById,
  saveProject,
  getSavedProjects,
  deleteProject,
  getProjectHistory,
} from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/generate', validateGenerateProject, generateProjectIdeas);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/save', saveProject);
router.get('/saved/all', getSavedProjects);
router.delete('/:id', deleteProject);
router.get('/history/all', getProjectHistory);

export default router;
