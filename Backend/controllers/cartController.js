const Cart = require('../models/cartModel');

// @desc    Add item to cart / Update cart
// @route   POST /api/cart
// @access  Private (Token zaroori hai)
const adminCartItems = async (req, res, next) => {
  const { cartItems } = req.body;

  try {
    // Check karo kya user ka cart pehle se bana hua hai
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Agar cart pehle se hai, toh naye items se replace/update kar do
      cart.cartItems = cartItems;
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      // Agar bilkul naya cart banana hai
      const newCart = new Cart({
        user: req.user._id,
        cartItems,
      });
      const createdCart = await newCart.save();
      res.status(201).json(createdCart);
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Get logged in user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      res.json(cart);
    } else {
      res.json({ cartItems: [] }); // Khali cart bhej do agar nahi bana toh
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = { adminCartItems, getUserCart };