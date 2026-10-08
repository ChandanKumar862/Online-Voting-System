import express from 'express';
import {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition
} from '../controllers/positionController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPositions);
router.get('/:id', getPositionById);
router.post('/', authenticateToken, requireRole('admin'), createPosition);
router.put('/:id', authenticateToken, requireRole('admin'), updatePosition);
router.delete('/:id', authenticateToken, requireRole('admin'), deletePosition);

export default router;
