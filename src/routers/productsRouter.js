const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', productsController.addNewProduct);

module.exports = router;