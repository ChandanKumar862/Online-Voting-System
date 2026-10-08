import express from 'express';
import {
  getAllStates,
  getStateById,
  getConstituenciesByState,
  createState,
  updateState,
  deleteState
} from '../controllers/stateController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllStates);
router.get('/:id', getStateById);
router.get('/:id/constituencies', getConstituenciesByState);
router.post('/', authenticateToken, requireRole('admin'), createState);
router.put('/:id', authenticateToken, requireRole('admin'), updateState);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteState);

export default router;
