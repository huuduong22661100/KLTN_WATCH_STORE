import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/productController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { adminAuth } from '../../middlewares/adminAuth.js';

const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProductById);

// yêu cầu xác thưcj
router.post('/', authenticateToken, adminAuth, createProduct);
router.put('/:id', authenticateToken, adminAuth, updateProduct);
router.delete('/:id', authenticateToken, adminAuth, deleteProduct);

export default router;
