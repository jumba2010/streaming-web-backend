const constants = require('../utils/constants');
const crudService = require("../services/crudService");

// Create a new vehicle
const addStock = async (req, res) => {
  try {

    const { stockData } = req.body;

    const stock = await crudService.create(constants.STOCK_TABLE,stockData);

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the stock.' });
  }
};


const findStockBySucursalId = async (req, res) => {
  try {

    const { sucursalId} = req.params;
    const {lastEvaluatedKey, pageLimit } = req.query;

    const stockList = await crudService.findBySucursalId(constants.STOCK_TABLE,sucursalId);
    res.status(200).json(stockList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};


module.exports = {
  addStock,
  findStockBySucursalId,
};
