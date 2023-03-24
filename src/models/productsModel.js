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
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const addNewProduct = async (name) => {
  const columns = Object.keys(snakeize(name)).join(', ');
  
    const placeholders = Object.keys(name)
    .map((_key) => '?')
    .join(', ');
  
    const [{ insertId }] = await connection.execute(
      `INSERT INTO products (${columns}) VALUE (${placeholders})`,
      [...Object.values(name)],
    );
  
    return insertId;
};
  
module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};