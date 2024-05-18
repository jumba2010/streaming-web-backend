const constants = require('../utils/constants');
const crudService = require("../services/crudService");

// Create a new vehicle
const createVehicle = async (req, res) => {
  try {

    const { vehicleData } = req.body;

    const newVehicle = await crudService.create(constants.VEHICLE_TABLE,vehicleData);

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the vehicle.' });
  }
};

// Get a vehicle by vehicleId
const getVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await crudService.readById(constants.VEHICLE_TABLE,vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the vehicle.' });
  }
};

// Update a vehicle by vehicleId
const updateVehicle = async (req, res) => {
  try {
    const { vehicleId,createdAt } = req.params;
    const { vehicleData } = req.body;

    const updatedVehicle = await crudService.update(constants.VEHICLE_TABLE,vehicleId,createdAt, vehicleData);

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: 'An error when updating vehicle'});
  }
}

// Delete a vehicle by vehicleId
const deleteVehicle = async (req, res) => {
  try {

    const { vehicleId } = req.params;

    await crudService.delete(constants.VEHICLE_TABLE,vehicleId);

    res.json({ message: 'Vehicle deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the vehicle.' });
  }
};

module.exports = {
  createVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
