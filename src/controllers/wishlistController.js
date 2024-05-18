const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const addToWishList= async (req, res) => {
  try {
    const { payload } = req.body;

    const wishList = await crudService.create(constants.WISH_LIST_TABLE,payload);

    res.status(201).json(wishList);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the stock.' });
  }
};

const removeWishList = async (req, res) => {
  try {
    const { wishListId,createdAt } = req.params;

     await crudService.deleteRow(constants.WISH_LIST_TABLE,wishListId,createdAt);
    res.status(200).json({ message: 'Wish list deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting wishList.',error });
  }
};

const findBySucursalId = async (req, res) => {
  try {
    
    const { sucursalId,startDate,endDate } = req.params;

    const wishList = await crudService.findActiveBySucursalIdAndDateInterval(constants.WISH_LIST_TABLE,sucursalId,startDate,endDate );

    res.status(200).json(wishList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findByUserId = async (req, res) => {
  try {
    
    const { userId} = req.params;
    const wishList = await crudService.findByUserId(constants.WISH_LIST_TABLE,userId);

    res.status(200).json(wishList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the the userId' });
  }
};


module.exports = {
  findBySucursalId,
  findByUserId,
  addToWishList,
  removeWishList,
};
