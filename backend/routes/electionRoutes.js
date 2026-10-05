import express from 'express';
import {
  getAllElections,
  getElectionById,
  createElection,
  updateElection,
  deleteElection,
  getElectionPositions
} from '../controllers/electionController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllElections);
router.get('/:id', getElectionById);
router.get('/:id/positions', getElectionPositions);
router.post('/', authenticateToken, requireRole('admin'), createElection);
router.put('/:id', authenticateToken, requireRole('admin'), updateElection);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteElection);

export default router;