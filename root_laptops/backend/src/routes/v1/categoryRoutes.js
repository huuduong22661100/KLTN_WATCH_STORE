import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/categoryController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Admin routes
router.post('/', authenticateToken, adminAuth, createCategory);
router.put('/:id', authenticateToken, adminAuth, updateCategory);
router.delete('/:id', authenticateToken, adminAuth, deleteCategory);

export default router;
