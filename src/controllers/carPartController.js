const constants = require('../utils/constants');
const crudService = require("../services/crudService");
const { getImagesFromS3 } = require('../services/aws/s3Service')
const {transformMapToList} = require('../utils/DynamoDBUpdaterUtil')
const createCarPart = async (req, res) => {
  try {
    // Extract data from request
    const carPartData = req.body;
    carPartData.newArrival = true;

    let code =  await crudService.generateOrderNumber(constants.CAR_PART_TABLE);
    carPartData.code = code;
    // Call the carPartService.createCarPart method
    const newCarPart = await crudService.create(constants.CAR_PART_TABLE, carPartData);

    const stockData = {
      availablequantity: carPartData.availablequantity,
      quantity: carPartData.availablequantity,
      sellprice: carPartData.sellprice,
      sucursalId: carPartData.sucursalId,
      createdBy: carPartData.createdBy,
      activatedBy: carPartData.activatedBy,
      soldQuantity: 0,
      type: 'ENTRANCE',
      product: {
        id: newCarPart.id,
        name: carPartData.name,
        images: carPartData.filenames
      }
    }

    const stock = await crudService.create(constants.STOCK_TABLE, stockData);

    res.status(201).json(newCarPart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the car part.' });
  }
};

const findById = async (req, res) => {
  try {
    const { id,sucursalId } = req.params;

    const carParts = await crudService.findByIdAndSucursalId(constants.CAR_PART_TABLE, id,sucursalId);

    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findCarPartsBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findNewArrivalsBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findNewArrivalsBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findFeaturedsBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findFeaturedBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findBestSellerBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findBestSellerBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findTopRatedBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findTopRatedBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

const findPopularBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findPopularBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};


const findSpecialOfferBySucursalId = async (req, res) => {
  try {

    const { sucursalId } = req.params;

    const carParts = await crudService.findSpecialOfferBySucursalId(constants.CAR_PART_TABLE, sucursalId);
    const newList = await composeCarPartData(carParts);

    res.status(200).json(newList);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given Id' });
  }
};

async function composeCarPartData(carParts) {
  const newList = [];
  for (let index = 0; index < carParts.length; index++) {
    const carpart = carParts[index];
    let features = transformMapToList(carpart.features);
    let filenames = transformMapToList(carpart.filenames);
    let services = transformMapToList(carpart.services);
    let mappedFilenames = filenames.map(fn => fn.url);
    carpart.features = features;
    carpart.services = services;
    carpart.filenames = await getImagesFromS3(mappedFilenames);
    newList.push(carpart);
  }
  return newList;
}



const updateCarPart = async (req, res) => {

  try {
    // Extract car part ID and updated data from request
    const { carPartId, createdAt } = req.params;
    const carPartData = req.body;

    // Call the carPartService.updateCarPart method
    const updatedCarPart = await crudService.update(constants.CAR_PART_TABLE, carPartId, createdAt, carPartData);

    if (!updatedCarPart) {
      return res.status(404).json({ message: 'Car part not found.' });
    }

    res.status(200).json(updatedCarPart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the car part.' });
  }
};

const deleteCarPart = async (req, res) => {
  try {
    // Extract car part ID from request
    const { carPartId, createdAt } = req.params;
    // Call the carPartService.deleteCarPart method
    await crudService.deleteRow(constants.CAR_PART_TABLE, carPartId, createdAt);
    res.status(200).json({ message: 'Car part deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the car part.', error });
  }
};

module.exports = {
  createCarPart, deleteCarPart,
  updateCarPart,
  findCarPartsBySucursalId,
  findBestSellerBySucursalId,
  findFeaturedsBySucursalId,
  findNewArrivalsBySucursalId,
  findPopularBySucursalId,
  findTopRatedBySucursalId,
  findSpecialOfferBySucursalId,
  findById,
};

