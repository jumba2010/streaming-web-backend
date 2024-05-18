const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/confirm', userController.confirmEmail);
router.post('/resend-code', userController.resendConfirmation);

module.exports = router;
