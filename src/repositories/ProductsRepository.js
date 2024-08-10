import Product from "../database/models/ProductsModel.js";

class ProductRepository {
  static get(product) {
    const productFinded = Product.findOne({ product });
    return productFinded;
  }
  static async save(product) {
      const newProduct = new Product({ product });
      return newProduct.save();
  }
  static async getOrSaveIfNotExist(product) {
    const existingProduct = await this.get(product);
    if (existingProduct) return existingProduct;
    return this.save(product);
  }
}
export default ProductRepository