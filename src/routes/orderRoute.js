// orderRoute.js

const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.createOrder);

router.delete('/:orderId', orderController.cancelOrder);

router.put('/:orderId/:createdAt', orderController.updateOrderStatus);

router.put('/refunded/:orderId/:createdAt', orderController.refundPayment);

router.get('/unique/sucursal/:sucursalId/id/:id', orderController.findById);
router.get('/user/:userId', orderController.findByUserId);

router.get('/:sucursalId/:startDate/:endDate', orderController.findActiveOrdersBysucursalIdAndDateInterval);

router.get('/refunded/:sucursalId/:startDate/:endDate', orderController.findRefundedOrders);


module.exports = router;
