const { productsModel } = require('../models');

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateId = (req, res, next) => {
  const requisition = req.body;

  const test = requisition.some((saleObject) => saleObject.productId === undefined);
  // console.log(test);
  if (test === true) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const requisition = req.body;
  console.log(requisition);

  const test = requisition.some((saleObject) => saleObject.quantity === undefined);
  if (test === true) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validateValidNumber = (req, res, next) => {
  const requisition = req.body;
  // console.log(requisition);

  const test = requisition.some((saleObject) => saleObject.quantity <= 0);
  if (test === true) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateProductExists = async (req, res, next) => {
  const requisition = req.body;
  const reqIds = await requisition.map((element) => element.productId);
  const promiseArray = reqIds.map((id) => productsModel.getProductById(id));
  const resolvedPromises = await Promise.all(promiseArray);
  
  if (resolvedPromises.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  next();

  // console.log('@@@@', myIds);
  // console.log('@@@@', myProductsId);
};

module.exports = {
  validateProduct,
  validateId,
  validateQuantity,
  validateValidNumber,
  validateProductExists,
};