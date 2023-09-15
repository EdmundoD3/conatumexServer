const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: String,
});

const Products = mongoose.model('product', productSchema);

module.exports = Products;