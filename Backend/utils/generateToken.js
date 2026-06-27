const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // jwt.sign() naya token banata hai
  // Isme hum user ki 'id' payload me daal rahe hain aur .env se secret key use kar rahe hain
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Yeh token 30 dino tak valid rahega (30 days)
  });
};

module.exports = generateToken;