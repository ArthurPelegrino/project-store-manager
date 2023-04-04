// const snakeize = require('snakeize');
// const camelize = require('camelize');
// const { newSale } = require('../controllers/salesController');

const connection = require('./connection');
// const { newSale } = require('../controllers/salesController');

const getAllSales = async () => {
  const [products] = await connection.execute(
   `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales as s 
    INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id
    ORDER BY saleId ASC, productId ASC`,
  );

  return products;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
   `SELECT s.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales as s 
    INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );

  return sale;
};

// const getProductById = async (productId) => {
//   console.log('@@@@ productId', productId);
//   const [[product]] = await connection.execute(
//     'SELECT * FROM products WHERE id = ?',
//     [productId],
//   );
//   return product;
// };

const addNewSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (now())',
  );
  console.log('32894723894732987498', insertId);
  return insertId;
};

const addNewSale = async ({ saleId, productId, quantity }) => {
  // newSaleKeys === { productId, quntity}
  // const columns = Object.keys(snakeize(newSaleKeys)).join(', ');
  
  //   const placeholders = Object.keys(newSaleKeys)
  //   .map((_key) => '?')
  //   .join(', ');
  
    const [{ insertId }] = await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [saleId, productId, quantity],
    );
  
    return insertId;
};

module.exports = {
  getAllSales,
  addNewSale,
  addNewSaleId,
  getSaleById,
};