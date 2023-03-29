const { productsService } = require('../services');
// const errorMap = require('../middlewares/errorMap');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(404).json('Nenhum produto correspondente ao ID');

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) {
    return res.status(404).json({ message });
  }

  res.status(200).json(message);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.addNewProduct(name);

  if (type) {
    return res.status(404).json({ message });
  }

  res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};