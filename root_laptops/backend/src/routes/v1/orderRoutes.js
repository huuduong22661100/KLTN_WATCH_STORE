import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  updateShippingStatus,
  cancelOrder,
  getAllOrders
} from '../../controllers/orderController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();


router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders); 


router.get('/admin/all', authenticateToken, adminAuth, getAllOrders); 


router.put('/:id/payment-status', authenticateToken, adminAuth, updatePaymentStatus);
router.put('/:id/order-status', authenticateToken, adminAuth, updateOrderStatus);
router.put('/:id/shipping-status', authenticateToken, adminAuth, updateShippingStatus);


router.put('/:id/status', authenticateToken, adminAuth, updateOrderStatus);


router.put('/:id/cancel', authenticateToken, cancelOrder);



router.get('/:id', authenticateToken, getOrderById);


export default router;
