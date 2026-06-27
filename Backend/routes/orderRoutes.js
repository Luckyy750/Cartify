const express = require('express');
const router = express.Router();
const { addOrderItems,getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

// 3. Kisi ek specific order ko dekhne ke liye (GET /api/orders/:id)
// 🚨 Dhyaan rahe: :id waala route hamesha 'myorders' ke niche hona chahiye, nahi toh Express 'myorders' ko bhi id samajh lega!
router.route('/:id').get(protect, getOrderById);
module.exports = router;