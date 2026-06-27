// 1. Kisi galat URL (Route) ke liye jo exist nahi karta (404 Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Yeh error ko agle middleware (errorHandler) ke paas bhej dega
};

// 2. Pure app mein kahin bhi koi bhi error aaye, use handle karne ke liye (500 Server Error)
const errorHandler = (err, req, res, next) => {
  // Agar pehle se koi status code set hai toh woh use karein, nahi toh 500 (Server Error) set karein
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // stack trace sirf development mode me dikhega, production me chhup jayega
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };