const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const add = async (req, res) => {
  try {
    const { payload } = req.body;
    const view = await crudService.create(constants.VIEW_TABLE,payload);

    res.status(201).json(view);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findBySucursalId = async (req, res) => {
  try {
    const { sucursalId,startDate,endDate } = req.params;
    const views = await crudService.findActiveBySucursalIdAndDateInterval(constants.VIEW_TABLE,sucursalId,startDate,endDate );

    res.status(200).json(views);
  } catch (error) {
    res.status(404).json(error);
  }
};



module.exports = {
  findBySucursalId,
  add,
};
