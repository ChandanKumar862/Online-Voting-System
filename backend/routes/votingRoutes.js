import express from 'express';
import { submitVote, getVoteStatus, getVoteHistory } from '../controllers/votingController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Strict authentication required for all voting operations to prevent fake/unauthorized voting
router.post('/', authenticateToken, submitVote);
router.get('/status/:electionId', authenticateToken, getVoteStatus);
router.get('/history', authenticateToken, getVoteHistory);

export default router;
