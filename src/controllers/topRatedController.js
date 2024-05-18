const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const findBySucursalId = async (req, res) => {
  try {

    const { sucursalId} = req.params;
    const {lastEvaluatedKey, pageLimit } = req.query;

    const stockList = await crudService.queryBySucursalId(constants.TOP_RATED_TABLE,sucursalId);

    res.status(200).json(stockList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given sucrusalId' });
  }
};


module.exports = {
  findBySucursalId,
};
