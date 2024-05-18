const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.post('/', wishlistController.addToWishList);

router.delete('/:wishListId/:createdAt', wishlistController.removeWishList);

router.get('/:sucursalId/:startDate/:endDate', wishlistController.findBySucursalId);

router.get('/user/:userId', wishlistController.findByUserId);


module.exports = router;
