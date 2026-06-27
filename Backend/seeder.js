const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const products = require('./data/products');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

// Load env variables (Kyunki hum is file ko server se alag chalayenge)
dotenv.config({ path: path.resolve(__dirname, '.env') });

connectDB();

const importData = async () => {
  try {
    // Purana koi bhi data ho toh use pehle delete kar do duplicate se bachne ke liye
    await Product.deleteMany();

    // Naye products ko insert karo
    await Product.insertMany(products);

    console.log('Data Imported Successfully! 🎉');
    process.exit();
  } catch (error) {
    console.error(`Error during data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed! 🗑️');
    process.exit();
  } catch (error) {
    console.error(`Error during data destroy: ${error.message}`);
    process.exit(1);
  }
};

// Terminal command ke hisab se function chalega
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}