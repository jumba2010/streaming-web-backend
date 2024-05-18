const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Create a new payment
router.post('/', paymentController.createPayment);

// Get a payment by ID
router.get('/:paymentId', paymentController.getPayment);

// Cancel a payment
router.delete('/:paymentId', paymentController.cancelPayment);

// Update payment status
router.put('/:paymentId/:createdAt', paymentController.updatePaymentStatus);

// Find active payments by user
router.get('/active/:sucursalId', paymentController.findActivePaymentsBySucursal);

// Find canceled payments
router.get('/cancelled/:sucursalId', paymentController.findCancelledPayments);

module.exports = router;
