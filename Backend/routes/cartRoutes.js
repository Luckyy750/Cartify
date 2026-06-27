const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel'); // check model path

// 🧪 NOTE: Jab tak Auth system nahi bana rahe, hum test karne ke liye 
// ek temporary hardcoded User ID use kar rahe hain (Mongoose ObjectId jaisa format)
const TEMP_USER_ID = '6a3ab58331facbabf5dd0001'; 

// @desc    Get current user's cart
// @route   GET /api/cart
router.get('/', async (req, res) => {
  try {
    // User ke hisab se cart dhoondo aur product details populate karo agar chahiye toh
    let cart = await Cart.findOne({ user: TEMP_USER_ID });
    
    if (!cart) {
      // Agar user ka cart nahi hai, toh ek khali cart array return kar do
      return res.json({ cartItems: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart data' });
  }
});

// @desc    Add or Update item inside cart array
// @route   POST /api/cart
router.post('/', async (req, res) => {
  const { name, qty, image, price, product } = req.body;

  try {
    // 1. Check karo kya user ka cart pehle se bana hua hai?
    let cart = await Cart.findOne({ user: TEMP_USER_ID });

    if (cart) {
      // 2. Cart toh hai, ab check karo kya yeh product array mein pehle se hai?
      const itemIndex = cart.cartItems.findIndex((item) => item.product.toString() === product);

      if (itemIndex > -1) {
        // Agar product mil gaya, toh sirf quantity badhao/update karo
        cart.cartItems[itemIndex].qty = qty;
      } else {
        // Agar naya product hai, toh array mein push kar do
        cart.cartItems.push({ name, qty, image, price, product });
      }
      
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      // 3. Agar cart nahi bana, toh naya document banao aur usme item daalo
      const newCart = new Cart({
        user: TEMP_USER_ID,
        cartItems: [{ name, qty, image, price, product }]
      });

      const createdCart = await newCart.save();
      return res.status(201).json(createdCart);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error adding item to cart array' });
  }
});

// @desc    Remove item from cart array
// @route   DELETE /api/cart/:productId
router.delete('/:productId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: TEMP_USER_ID });

    if (cart) {
      // Array se us product ko filter karke hata do
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== req.params.productId
      );
      
      await cart.save();
      res.json({ message: 'Item removed from cart list', cartItems: cart.cartItems });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from cart array' });
  }
});

module.exports = router;