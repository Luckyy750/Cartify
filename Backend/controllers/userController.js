const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token (LOGIN)
// @route   POST /api/users/login
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Hamara custom matchPassword ab perfectly kaam karega!
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Wristband de diya!
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Register a new user (SIGNUP)
// @route   POST /api/users
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Naya user create karein (Yahan pre-save middleware password encrypt kar dega)
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Signup par bhi wristband de diya!
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (Sirf logged-in users ke liye)
const getUserProfile = async (req, res) => {
  // Jo user humne middleware me 'req.user' me save kiya tha, use nikal lete hain
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    // req.user humein protect middleware se milta hai
    const user = await User.findById(req.user._id);

    if (user) {
      // Agar body me naya naam ya email aaya hai toh wo rakhlo, nahi toh purana hi rehne do
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // Agar password bhi update karna hai
      if (req.body.password) {
        user.password = req.body.password; // Yeh automatic hash ho jayega agar aapne pre-save hook lagaya hai
      }

      const updatedUser = await user.save();

      // Update hone ke baad naya data aur naya token wapas bhejenge
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      return next(new Error('User not found'));
    }
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

// 🚨 YAAD SE: module.exports me is naye function ko add karna mat bhoolna!
module.exports = { authUser, registerUser, getUserProfile, updateUserProfile };


