import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  product: String,
});

const Product = model('Product', productSchema);

export default Product;