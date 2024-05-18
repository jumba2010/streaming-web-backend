const express = require('express');
const popularCategoryController = require('../controllers/popularCategoryController');

const router = express.Router();

router.get('/:sucursalId', popularCategoryController.findBySucursalId);

module.exports = router;
