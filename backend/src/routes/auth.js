import express from 'express';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authMiddleware, getProfile);
router.post('/logout', authMiddleware, logout);

export default router;
