const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/:sucursalId', categoryController.findBySucursalId);

module.exports = router;
