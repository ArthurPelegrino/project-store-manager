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

const updateProduct = async (id, name) => {
  const productToUpdate = await productsModel.getProductById(id);
  console.log('@#@#@#@#@# toupdate', productToUpdate);
  
  if (!productToUpdate) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  
  const productUpdated = await productsModel.updateProduct(productToUpdate, name);
  return { type: null, message: productUpdated };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
};