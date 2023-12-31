const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(404).json('Nenhum venda correspondente ao ID');

  res.status(200).json(message);
};

const newSale = async (req, res) => {
  const { type, message } = await salesService.addNewSale(req.body);

  if (type) {
    return res.status(404).json({ message });
  }
  res.status(201).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) {
    return res.status(404).json({ message });
  }

 return res.status(200).json(message);
};

module.exports = {
  getAllSales,
  newSale,
  getSalesById,
};