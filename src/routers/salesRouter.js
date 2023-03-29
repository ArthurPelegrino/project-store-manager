const express = require('express');
const { salesController } = require('../controllers');
const {
  validateId,
  validateQuantity,
  validateValidNumber,
  validateProductExists,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/',
  validateId,
  validateValidNumber,
  validateQuantity,
  validateProductExists,
  salesController.newSale);

module.exports = router;