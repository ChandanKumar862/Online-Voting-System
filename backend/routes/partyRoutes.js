import express from 'express';
import {
  getAllParties,
  getPartyById,
  createParty,
  updateParty,
  deleteParty
} from '../controllers/partyController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllParties);
router.get('/:id', getPartyById);
router.post('/', authenticateToken, requireRole('admin'), createParty);
router.put('/:id', authenticateToken, requireRole('admin'), updateParty);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteParty);

export default router;
