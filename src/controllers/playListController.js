const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const add = async (req, res) => {
  try {
    const { payload } = req.body;
    const view = await crudService.create(constants.PLAY_LIST_TABLE,payload);

    res.status(201).json(view);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findByUserId = async (req, res) => {
  try {
    
    const { userId} = req.params;
    const playlist = await crudService.findByUserId(constants.PLAY_LIST_TABLE,userId);

    res.status(200).json(playlist);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the the userId' });
  }
};



module.exports = {
  findByUserId,
  add,
};
