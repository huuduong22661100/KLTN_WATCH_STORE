import express from 'express';
import {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor
} from '../../controllers/colorController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getColors);
router.get('/:id', getColorById);

// Admin routes
router.post('/', authenticateToken, adminAuth, createColor);
router.put('/:id', authenticateToken, adminAuth, updateColor);
router.delete('/:id', authenticateToken, adminAuth, deleteColor);

export default router;
