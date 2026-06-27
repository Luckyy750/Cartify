const crypto = require('crypto');
const razorpayInstance = require('../config/razorpay');
const Order = require('../models/orderModel');

// @desc    Create Razorpay Order
// @route   POST /api/payment/checkout
// @access  Private
const checkout = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      res.status(400);
      return next(new Error('Please provide an amount'));
    }

    // 🌟 MOCK BYPASS: Agar keys dummy/nakli hain, toh khud hi ek fake id bana kar bhej do
    if (process.env.RAZORPAY_KEY_ID && (process.env.RAZORPAY_KEY_ID.includes('dummy') || process.env.RAZORPAY_KEY_ID.startsWith('rzp_test_dummy'))) {
      return res.status(200).json({
        success: true,
        order: {
          id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
          entity: "order",
          amount: Number(amount * 100),
          currency: "INR",
          status: "created"
        }
      });
    }

    // Asli Razorpay logic (jo sirf tab chalega jab aap asli keys lagayengi)
    const options = {
      amount: Number(amount * 100), 
      currency: "INR",
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });

  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Verify Payment Signature and Update Order Status
// @route   POST /api/payment/verify
// @access  Private
const paymentVerification = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Security Check: Agar fake id chal rahi hai toh seedhe pass kar do
    if (razorpay_order_id && razorpay_order_id.startsWith('order_mock_')) {
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();
        return res.status(200).json({ success: true, message: "Mock Payment Verified successfully!" });
      }
    }

    // Asli verification logic
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { id: razorpay_payment_id, status: "completed" };
        await order.save();
        res.status(200).json({ success: true, message: "Payment Verified Successfully" });
      } else {
        res.status(404);
        next(new Error("Order not found"));
      }
    } else {
      res.status(400).json({ success: false, message: "Payment Verification Failed" });
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = { checkout, paymentVerification };