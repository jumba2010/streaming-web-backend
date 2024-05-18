const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const findBySucursalId = async (req, res) => {
  try {
    
    const { sucursalId} = req.params;
    const {lastEvaluatedKey, pageLimit } = req.query;

    const popularProducts = await crudService.findBySucursalId(constants.POPULAR_PRODUCT_TABLE,sucursalId);

    res.status(200).json(popularProducts);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};


module.exports = {
  findBySucursalId,
};
