const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.post('/', viewsController.add);

router.get('/:sucursalId/:startDate/:endDate', viewsController.findBySucursalId);


module.exports = router;
