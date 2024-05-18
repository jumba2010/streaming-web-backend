const constants = require('../utils/constants');
const crudService = require("../services/crudService");

const addClient = async (req, res) => {
  try {

    const { clientData } = req.body;

    const client = await crudService.create(constants.CLIENT_TABLE,clientData);

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the stock.' });
  }
};

const updateClient = async (req, res) => {
  try {

    const { clientId,createdAt } = req.params;
    const clientData  = req.body;

    const updatedClient =  await crudService.update(constants.CLIENT_TABLE,clientId,createdAt, clientData);
    
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the client.' });
  }
};


const findClientByUserId = async (req, res) => {
  try {

    const { userId } = req.params;

    const client = await crudService.findActiveByUserId(constants.CLIENT_TABLE,userId);

    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

module.exports = {
  addClient,
  updateClient,
  findClientByUserId,
};
