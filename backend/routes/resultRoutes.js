import express from 'express';
import { getElectionResults, getWinner } from '../controllers/resultController.js';

const router = express.Router();

router.get('/:electionId', getElectionResults);
router.get('/:electionId/winner', getWinner);

export default router;
