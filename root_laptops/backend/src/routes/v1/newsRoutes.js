import express from 'express';
import {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} from '../../controllers/newsController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getNews);
router.get('/:slug', getNewsBySlug);

// Admin routes
router.post('/', authenticateToken, adminAuth, createNews);
router.put('/:id', authenticateToken, adminAuth, updateNews);
router.delete('/:id', authenticateToken, adminAuth, deleteNews);

export default router;
