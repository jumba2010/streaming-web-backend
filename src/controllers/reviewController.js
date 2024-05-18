const constants = require('../utils/constants');
const crudService = require("../services/crudService");


const addReview = async (req, res) => {
  try {
    const  reviewData = req.body;
  
    const review = await crudService.create(constants.REVIEW_TABLE,reviewData);

    res.status(201).json(review);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while adding review.' });
  }
};

const updateReview = async (req, res) => {
  try {
    // Extract car part ID and updated data from request
    const { reviewId,createdAt } = req.params;
    const payload  = req.body;

    // Call the carPartService.updateCarPart method
    const review =  await crudService.update(constants.REVIEW_TABLE,reviewId,createdAt, payload);
    
    if (!review) {
      return res.status(404).json({ message: 'Review part not found.' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the review.' });
  }
};


const findBySucursalId = async (req, res) => {
  try {

    const { sucursalId} = req.params;
    const {lastEvaluatedKey, pageLimit } = req.query;

    const reviews = await crudService.findBySucursalId(constants.NEW_ARRIVALS_TABLE,sucursalId);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given sucrusalId' });
  }
};


module.exports = {
  findBySucursalId,
  addReview,
  updateReview
};
