const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      return next(new Error('No order items'));
    } else {
      const order = new Order({
        user: req.user._id, // Protected middleware se milega
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};
// ... purana addOrderItems code upar rahega ...

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    // .populate() se hum user ki ID ke sath uska naam aur email bhi khinch lenge
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      next(new Error('Order not found'));
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    // Sirf us user ke orders nikalo jo logged in hai
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Module exports mein inko bhi jod dijiye
module.exports = { addOrderItems, getOrderById, getMyOrders };
