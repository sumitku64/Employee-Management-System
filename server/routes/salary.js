import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import {getEmployees, addSalary, getSalary} from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/employees/:id', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getSalary);
// router.put('/:id', authMiddleware, updateLeave);
// router.delete('/:id', authMiddleware, deleteDepartment);

export default router