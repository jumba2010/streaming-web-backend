const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.post('/', stockController.addStock);
router.get('/:sucursalId', stockController.findStockBySucursalId);

module.exports = router;
