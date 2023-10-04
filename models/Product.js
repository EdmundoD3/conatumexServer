import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  product: String,
});

const Product = model('product', productSchema);

export default Product;