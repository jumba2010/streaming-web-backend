const constants = require('../utils/constants');
const crudService = require("../services/crudService");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { paymentData } = req.body;
    const newPayment = await crudService.create(constants.PAYMENT_TABLE,paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the payment.' });
  }
};

// Get a payment by ID
const getPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await crudService.readById(constants.PAYMENT_TABLE,paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the payment.' });
  }
};

// Cancel a payment
const cancelPayment = async (req, res) => {
  try {
    const { paymentId,createdAt } = req.params;
    await crudService.update(constants.PAYMENT_TABLE,paymentId,createdAt,{status:'CANCELLED'});
    res.json({ message: 'Payment canceled successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while canceling the payment.' });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId,createdAt } = req.params;
    const { newStatus } = req.body;
    await crudService.update(constants.PAYMENT_TABLE,paymentId,createdAt, {newStatus});
    res.json({ message: 'Payment status updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the payment status.' });
  }
};

// Find active payments by user (everything not canceled)
const findActivePaymentsBySucursal = async (req, res) => {
  try {
    const { sucursalId } = req.params;
    const activePayments = await crudService.findBySucursalId(constants.PAYMENT_TABLE,sucursalId);
    res.json(activePayments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching active payments.' });
  }
};

// Find canceled payments
const findCancelledPayments = async (req, res) => {
  try {
    const cancelledPayments = await crudService.queryBySucursalIdAndStatus(constants.PAYMENT_TABLE,req.params.sucursalId,'CANCELLED');
    res.json(cancelledPayments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching canceled payments.' });
  }
};

module.exports = {
  createPayment,
  getPayment,
  cancelPayment,
  updatePaymentStatus,
  findActivePaymentsBySucursal,
  findCancelledPayments,
};
