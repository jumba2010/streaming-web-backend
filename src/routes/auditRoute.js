const express = require('express');
const auditController = require('../controllers/auditController');

const router = express.Router();

router.get('/:sucursalId/:startDate/:endDate', auditController.findBySucursalId);

module.exports = router;
