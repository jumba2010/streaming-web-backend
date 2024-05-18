const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const findBySucursalId = async (req, res) => {
  try {

    const { sucursalId} = req.params;
    const {lastEvaluatedKey, pageLimit } = req.query;

    const newArrivals = await crudService.findBySucursalId(constants.NEW_ARRIVALS_TABLE,sucursalId);

    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given sucrusalId' });
  }
};


module.exports = {
  findBySucursalId,
};
