const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', reviewController.addReview);
router.get('/:sucursalId', reviewController.findBySucursalId);
router.put('/:reviewId/:createdAt', reviewController.updateReview);


module.exports = router;
