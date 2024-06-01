const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const addToFavourite= async (req, res) => {
  try {
    const { payload } = req.body;

    const favourite = await crudService.create(constants.FAVOURITE_TABLE,payload);

    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the stock.' });
  }
};

const removeFavourite = async (req, res) => {
  try {
    const { favouriteId,createdAt } = req.params;

     await crudService.deleteRow(constants.FAVOURITE_TABLE,favouriteId,createdAt);
    res.status(200).json({ message: 'Favourite deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting favourite.',error });
  }
};

const findBySucursalId = async (req, res) => {
  try {
    
    const { sucursalId,startDate,endDate } = req.params;

    const favourite = await crudService.findActiveBySucursalIdAndDateInterval(constants.FAVOURITE_TABLE,sucursalId,startDate,endDate );

    res.status(200).json(favourite);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findByUserId = async (req, res) => {
  try {
    
    const { userId} = req.params;
    const favourite = await crudService.findByUserId(constants.FAVOURITE_TABLE,userId);

    res.status(200).json(favourite);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the the userId' });
  }
};


module.exports = {
  findBySucursalId,
  findByUserId,
  addToFavourite,
  removeFavourite,
};
