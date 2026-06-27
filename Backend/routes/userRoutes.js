const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile,updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

// 1. Signup ke liye route (POST /api/users)
router.route('/').post(registerUser);

// 2. Login ke liye route (POST /api/users/login)
router.post('/login', authUser);

// 3. Profile ke liye route (GET /api/users/profile)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;