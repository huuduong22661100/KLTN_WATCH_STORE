import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// User routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// ✅ Admin routes (require admin authentication)
router.get('/', authenticateToken, adminAuth, getUsers);
router.get('/:id', authenticateToken, adminAuth, getUserById);
router.put('/:id', authenticateToken, adminAuth, updateUser);

router.delete('/:id', authenticateToken, adminAuth, deleteUser);

export default router;
