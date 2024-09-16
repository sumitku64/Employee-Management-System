import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import {getLeaves, getLeave, updateLeave, getLeaveByUserId, addLeave} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware, addLeave);
router.get('/', authMiddleware, getLeaves);
router.get('/:id', authMiddleware, getLeave);
router.get('/employee/:id', authMiddleware, getLeaveByUserId);
router.put('/:id', authMiddleware, updateLeave);
// router.delete('/:id', authMiddleware, deleteDepartment);

export default router