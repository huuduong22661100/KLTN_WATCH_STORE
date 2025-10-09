import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  updateUserCart,
} from '../../controllers/cartController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

// xác thực
router.use(authenticateToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/', updateUserCart); // New route for updating the entire cart
router.put('/items/:item_id', updateCartItem);
router.delete('/items/:item_id', removeFromCart);

export default router;
