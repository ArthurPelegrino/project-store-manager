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
  console.log(saleId);
  
 await Promise.all(
    requisition.map((element) => salesModel.addNewSale({
        saleId,
        productId: element.productId,
        quantity: element.quantity,
      })),
  );
  
  // const newSale = await salesModel.getSaleById();

  return {
    type: null,
    message: {
      id: saleId,
      itemsSold: requisition,
    },
  };
};

module.exports = {
  getAllSales,
  addNewSale,
};