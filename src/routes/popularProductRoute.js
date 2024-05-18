const express = require('express');
const popularProductController = require('../controllers/popularProductController');

const router = express.Router();

router.get('/:sucursalId', popularProductController.findBySucursalId);

module.exports = router;
