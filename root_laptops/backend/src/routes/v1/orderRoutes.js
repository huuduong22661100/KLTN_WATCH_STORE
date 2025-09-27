import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} from '../../controllers/orderController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();

// User-specific routes (require login)
router.post('/', authenticateToken, createOrder);
router.get('/my-orders', authenticateToken, getUserOrders);

// Admin-only routes (require admin login)
router.get('/', authenticateToken, adminAuth, getAllOrders);
router.put('/:id/status', authenticateToken, adminAuth, updateOrderStatus);

// Mixed access route (logic is handled in controller)
// An admin can see any order, a user can only see their own.
router.get('/:id', authenticateToken, getOrderById);


export default router;
