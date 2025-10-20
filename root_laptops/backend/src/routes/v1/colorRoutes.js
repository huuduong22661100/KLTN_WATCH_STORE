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


router.get('/', getColors);
router.get('/:id', getColorById);


router.post('/', authenticateToken, adminAuth, createColor);
router.put('/:id', authenticateToken, adminAuth, updateColor);
router.delete('/:id', authenticateToken, adminAuth, deleteColor);

export default router;
