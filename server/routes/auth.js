import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { login, Register, upload, verify } from '../controllers/authController.js';

const router = express.Router();

// router.post('/register',upload.single('image'), Register);
router.post('/login', login);
router.get('/verify',authMiddleware, verify)

export default router
