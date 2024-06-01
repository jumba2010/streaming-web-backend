const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const add = async (req, res) => {
  try {
    const { payload } = req.body;
    const watchList = await crudService.create(constants.WATCH_LIST_TABLE,payload);

    res.status(201).json(watchList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findByUserId = async (req, res) => {
  try {
    
    const { userId} = req.params;
    const watchList = await crudService.findByUserId(constants.WATCH_LIST_TABLE,userId);

    res.status(200).json(watchList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the the userId' });
  }
};

module.exports = {
  findByUserId,
  add,
};
