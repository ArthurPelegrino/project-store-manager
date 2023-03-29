// const camelize = require('camelize');
const snakeize = require('snakeize');

const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const getProductById = async (productId) => {
  console.log('@@@@ productId', productId);
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const addNewProduct = async (products) => {
  const columns = Object.keys(snakeize(products)).join(', ');
  
    const placeholders = Object.keys(products)
    .map((_key) => '?')
    .join(', ');
  
    const [{ insertId }] = await connection.execute(
      `INSERT INTO products (${columns}) VALUE (${placeholders})`,
      [...Object.values(products)],
    );
  
    return insertId;
};
  
module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};