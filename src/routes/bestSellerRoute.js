const express = require('express');
const bestSellerController = require('../controllers/bestSellerController');

const router = express.Router();

router.get('/:sucursalId', bestSellerController.findBySucursalId);

module.exports = router;
