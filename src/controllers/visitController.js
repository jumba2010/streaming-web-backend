const constants = require('../utils/constants');
const crudService = require("../services/crudService");

// Create a new vehicle
const addVisit = async (req, res) => {
  try {

    const { visitData } = req.body;

    const stock = await crudService.create(constants.VISIT_TABLE,visitData);

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the stock.' });
  }
};


const findVisitBySucursalId = async (req, res) => {
  try {

    const { sucursalId,startDate,endDate } = req.params;

    const visits = await crudService.findActiveBySucursalIdAndDateInterval(constants.VISIT_TABLE,sucursalId,startDate,endDate );

    res.status(200).json(visits);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const buildChart = async (req, res) => {
  try {
  
    const { sucursalId,startDate,endDate } = req.params;

    const visitChartData = await crudService.buildChart(constants.VISIT_TABLE,sucursalId,startDate,endDate);

    res.status(200).json(visitChartData);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};


module.exports = {
  addVisit,
  findVisitBySucursalId,
  buildChart,
};
