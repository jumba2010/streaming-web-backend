const express = require('express');
const favouriteController = require('../controllers/favouriteController');

const router = express.Router();

router.post('/', favouriteController.addToFavourite);

router.delete('/:favouriteId/:createdAt', favouriteController.removeFavourite);

router.get('/:sucursalId/:startDate/:endDate', favouriteController.findBySucursalId);

router.get('/user/:userId', favouriteController.findByUserId);


module.exports = router;
