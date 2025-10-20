import express from 'express';
import {
  getNews,
  getNewsBySlug,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../../controllers/newsController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();


router.get('/', getNews);
router.get('/slug/:slug', getNewsBySlug);
router.get('/:id', getNewsById);


router.post('/', authenticateToken, adminAuth, createNews);
router.put('/:id', authenticateToken, adminAuth, updateNews);
router.delete('/:id', authenticateToken, adminAuth, deleteNews);

export default router;
