const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const findBySucursalId = async (req, res) => {
  try {

    const {lastEvaluatedKey, pageLimit } = req.query;
    const { sucursalId,startDate,endDate } = req.params;

    const auditList = await crudService.findActiveBySucursalIdAndDateInterval(constants.AUDIT_TABLE,sucursalId,startDate,endDate );
    res.status(200).json(auditList);
  } catch (error) {
    res.status(404).json(error);
  }
};


module.exports = {
  findBySucursalId,
};
