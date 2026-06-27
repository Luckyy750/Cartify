const express = require('express');
const router = express.Router();
const { checkout, paymentVerification } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/checkout').post(protect, checkout);
router.route('/verify').post(protect, paymentVerification);

module.exports = router;