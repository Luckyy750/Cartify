const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  deleteProduct, 
  createProduct, 
  updateProduct 
} = require('../controllers/productController');

// Dono guards ko import kijiye
const { protect, admin } = require('../middleware/authMiddleware');

// Base Route: GET /api/products (Sabko dikhao), POST /api/products (Sirf Admin)
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// ID Route: GET (Sabko dikhao), PUT aur DELETE (Sirf Admin)
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;