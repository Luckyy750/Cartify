const express = require('express');
const cors = require('cors');
const connectDB = require('./Backend/config/db');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./Backend/middleware/errorMiddleware');
const userRoutes = require('./Backend/routes/userRoutes'); 
const cartRoutes = require('./Backend/routes/cartRoutes'); // <-- Import bilkul sahi hai!
const orderRoutes = require('./Backend/routes/orderRoutes');
// Load environment variables
dotenv.config();
console.log("Hamari Connection String Hai:", process.env.MONGO_URI);
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
connectDB();
const paymentRoutes = require('./Backend/routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// --- SARE ROUTES YAHAN HONGE ---
app.use('/api/products', require('./Backend/routes/productRoutes'));
app.use('/api/users', userRoutes); 
app.use('/api/cart', cartRoutes); // 🚨 YEH LINE MISSING THI! Isko yahan register kar diya.
app.use('/api/orders', orderRoutes);
// Sample Route
app.use('/api/payment', paymentRoutes); // <-- Yeh rahi aapki chamakti naye payment routes!
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// --- ERROR MIDDLEWARES (Hamesha saare routes ke niche) ---
app.use(notFound);      
app.use(errorHandler);  
// 404 Route Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Custom Handler (Jo har error ko ek sundar JSON bana deta hai)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});
// Define Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});