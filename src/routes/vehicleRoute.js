// vehicleRoute.js

const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// Create a new vehicle
router.post('/', vehicleController.createVehicle);

// Get a vehicle by vehicleId
router.get('/:vehicleId', vehicleController.getVehicle);

// Update a vehicle by vehicleId
router.put('/:vehicleId/:createdAt', vehicleController.updateVehicle);

// Delete a vehicle by vehicleId
router.delete('/:vehicleId', vehicleController.deleteVehicle);

module.exports = router;
