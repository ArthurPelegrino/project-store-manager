const express = require('express');
const { productsController } = require('../controllers/index');
const { validateProduct } = require('../middlewares/validations');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', validateProduct, productsController.addNewProduct);

module.exports = router;