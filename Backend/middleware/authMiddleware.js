const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 🔒 1. User Authentication Guard (Normal Login Check)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next(); 
    } catch (error) {
      console.error("🚨 Token Verification Failed:", error.message);
      res.status(401);
      return next(new Error('Not authorized, token failed')); 
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token')); 
  }
};

// 👑 2. Admin Privileges Guard (Malik Check) - 🌟 YEH MISSING THA!
const admin = (req, res, next) => {
  // protect middleware chalne ke baad req.user mein user ka data aa jata hai
  if (req.user && req.user.isAdmin) {
    return next(); // Agar user admin hai, toh aage badhne do!
  } else {
    res.status(401);
    return next(new Error('Not authorized as an admin! Sirf Admin allowed hai.'));
  }
};

// Dono guards ko ek saath market mein utaro
module.exports = { protect, admin };