const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.post('/', clientController.addClient);
router.put('/', clientController.updateClient);
router.get('/:userId', clientController.findClientByUserId);

module.exports = router;
