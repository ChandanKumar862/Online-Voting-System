import express from 'express';
import {
  getAllConstituencies,
  getConstituencyById,
  createConstituency,
  updateConstituency,
  deleteConstituency
} from '../controllers/constituencyController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllConstituencies);
router.get('/:id', getConstituencyById);
router.post('/', authenticateToken, requireRole('admin'), createConstituency);
router.put('/:id', authenticateToken, requireRole('admin'), updateConstituency);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteConstituency);

export default router;
