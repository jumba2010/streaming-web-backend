const express = require('express');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

// Create a new promotion
router.post('/', promotionController.createPromotion);

// Update an existing promotion
router.put('/:promotionId/:createdAt', promotionController.inactivatePromotion);

// Find all active promotions
router.get('/:sucursalId', promotionController.findPromotions);

module.exports = router;
