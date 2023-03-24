const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  console.log(products);
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const addNewProduct = async (name) => {
  const newProductId = await productsModel.addNewProduct({ name });
  const newProduct = await productsModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};