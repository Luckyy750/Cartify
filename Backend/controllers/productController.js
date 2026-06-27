const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res,next) => {
  try {
    // Product.find({}) database se saare products nikal kar laata hai
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res,next) => {
  try {
    // req.params.id ka matlab hai URL se ID nikalna (e.g., /api/products/6a381e66...)
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // Agar ID valid hai par us ID ka koi product database me nahi mila
      res.status(404);
      next(new Error('Product not found'));
    }
  } catch (error) {
    // Agar ID ka format hi galat hai, toh yeh catch block me aayega
    res.status(500);
    next(error);
  }
};

// @desc    Delete a product (Admin Only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // Database se saaf!
      res.status(200).json({ success: true, message: 'Product removed successfully' });
    } else {
      res.status(404);
      next(new Error('Product not found'));
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Create a product (Admin Only)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
      name: name || 'Sample Name',
      price: price || 0,
      user: req.user._id, // Kis admin ne banaya uski id
      image: image || '/images/sample.jpg',
      brand: brand || 'Sample Brand',
      category: category || 'Sample Category',
      countInStock: countInStock || 0,
      description: description || 'Sample Description',
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, product: createdProduct });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Update a product (Admin Only)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.status(200).json({ success: true, product: updatedProduct });
    } else {
      res.status(404);
      next(new Error('Product not found'));
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Sabse niche module.exports mein in teeno ko add karna mat bhoolna:
module.exports = {
  getProducts,
  getProductById,
  deleteProduct,  // <-- Naya
  createProduct,  // <-- Naya
  updateProduct,  // <-- Naya
};

