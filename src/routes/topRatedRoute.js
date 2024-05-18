const express = require('express');
const topRatedController = require('../controllers/topRatedController');

const router = express.Router();

router.get('/:sucursalId', topRatedController.findBySucursalId);

module.exports = router;
