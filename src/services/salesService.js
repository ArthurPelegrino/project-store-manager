// const { salesModel } = require('../models');
const salesModel = require('../models/salesModel');
// const { productsModel } = require('../models');
const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  console.log(sales);
  return { type: null, message: sales };
};

const addNewSale = async (requisition) => {
  const saleId = await salesModel.addNewSaleId();
  
await Promise.all(
    requisition.map((element) => salesModel.addNewSale({
        saleId,
        productId: element.productId,
        quantity: element.quantity,
      })),
  );

  return {
    type: null,
    message: {
      id: saleId,
      itemsSold: requisition,
    },
  };
};

const getSaleById = async (id) => {
  const sales = await salesModel.getSaleById(id);

  if (!sales.length) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sales };
};

module.exports = {
  getAllSales,
  addNewSale,
  getSaleById,
};