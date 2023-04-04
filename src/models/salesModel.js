// const snakeize = require('snakeize');
const camelize = require('camelize');
// const { newSale } = require('../controllers/salesController');

const connection = require('./connection');
// const { newSale } = require('../controllers/salesController');

const getAllSales = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.sales AND StoreManager.sales_products',
  );

  return products;
};

const getSaleById = async (saleId) => {
    const [[sale]] = await connection.execute('SELECT * FROM passenger WHERE id = ?',
    [saleId]);
    return camelize(sale);
};

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
  getSaleById,
  addNewSaleId,
};