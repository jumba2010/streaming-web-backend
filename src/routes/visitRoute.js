const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();

router.post('/', visitController.addVisit);
router.get('/:sucursalId/:startDate/:endDate', visitController.buildChart);

module.exports = router;
