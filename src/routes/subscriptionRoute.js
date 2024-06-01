const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/', subscriptionController.add);
router.put('/renew/:subscriptionId', subscriptionController.renew);
router.put('/cancel/:subscriptionId', subscriptionController.cancel);
router.get('/:userId', subscriptionController.findByUserId);


module.exports = router;
