import express from 'express';
import {
  getAllCandidates,
  getCandidateById,
  getCandidatesByElection,
  getCandidatesByConstituency,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from '../controllers/candidateController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCandidates);
router.get('/election/:electionId', getCandidatesByElection);
router.get('/constituency/:constituencyId', getCandidatesByConstituency);
router.get('/:id', getCandidateById);
router.post('/', authenticateToken, requireRole('admin'), createCandidate);
router.put('/:id', authenticateToken, requireRole('admin'), updateCandidate);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteCandidate);

export default router;
