const mongoose = require('mongoose');

// Blueprint for how a product document will look in MongoDB
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      default: 0,
    },
    image: {
      type: String, // Stores the URL of the product image
      required: [true, 'Product image URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Product stock count is required'],
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Creating the Model from the Schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;