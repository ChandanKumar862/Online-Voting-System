import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteUser);

export default router;
