const express = require('express');
const newArrivalsController = require('../controllers/newArrivalsController');

const router = express.Router();

router.get('/:sucursalId', newArrivalsController.findBySucursalId);

module.exports = router;
