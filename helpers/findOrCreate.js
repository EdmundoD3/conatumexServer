import Colonia from "../models/Colonia.js";
import Ciudad from "../models/Ciudad.js";
import Product from "../models/Product.js";

const coloniaData = async ({ colonia }) => {
  try {
    const coloniaFinded = await Colonia.findOne({ colonia })
    if (!coloniaFinded) {
      // the document not exist, create new document
      const newColonia = new Colonia({
        colonia
      });
      return newColonia.save()
        .then((savedColonia) => savedColonia)
        .catch((error) => {
          console.error('Error:', error);
          return error
        });
    }
    return coloniaFinded
  } catch (error) {
    console.log(error)
  }
}


const ciudadData = async ({ ciudad }) => {
  try {
    const ciudadFinded = await Ciudad.findOne({ ciudad })
    if (!ciudadFinded) {
      // the document not exist, create new document
      const newColonia = new Ciudad({
        ciudad
      });
      return newColonia.save()
        .then((savedCiudad) => savedCiudad)
        .catch((error) => {
          console.error('Error:', error);
          return error
        });
    }
    return ciudadFinded
  } catch (error) {
    console.log(error)
  }
}

const productData = async ({ product }) => {
  try {
    const productFinded = await Product.findOne({ product })
    if (!productFinded) {
      // the document not exist, create new document
      const newProduct = new Product({
        product
      });
      return newProduct.save()
        .then((savedProduct) => savedProduct)
        .catch((error) => {
          console.error('Error:', error);
          return error
        });
    }
    return productFinded
  } catch (error) {
    console.log(error)
  }
}

const findOrCreate = {
  coloniaData,
  ciudadData,
  productData
}


export default findOrCreate