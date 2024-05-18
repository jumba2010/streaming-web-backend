const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', userController.createUser);

// Update an existing user
router.put('/:userId/:createdAt', userController.updateUser);

// Inactivate a user
router.delete('/:userId', userController.inactivateUser);

// Find an active user by ID
router.get('/:userId', userController.findActiveUserById);

router.post('/auth/login', userController.login);
router.post('/auth/confirm', userController.confirmEmail);
router.post('/auth/resend', userController.resendConfirmation);

module.exports = router;
