const express = require('express');
const specialOfferController = require('../controllers/specialOfferController');

const router = express.Router();

router.get('/:sucursalId', specialOfferController.findBySucursalId);

module.exports = router;
