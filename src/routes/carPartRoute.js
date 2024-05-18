const express = require('express');
const carPartController = require('../controllers/carPartController');

const router = express.Router();

router.post('/', carPartController.createCarPart);

router.get('/:sucursalId', carPartController.findCarPartsBySucursalId);
router.get('/sucursal/:sucursalId/id/:id', carPartController.findById);
router.get('/featured/:sucursalId', carPartController.findFeaturedsBySucursalId);
router.get('/new-arrival/:sucursalId', carPartController.findNewArrivalsBySucursalId);
router.get('/popular/:sucursalId', carPartController.findPopularBySucursalId);
router.get('/top-rated/:sucursalId', carPartController.findTopRatedBySucursalId);
router.get('/best-seller/:sucursalId', carPartController.findBestSellerBySucursalId);
router.get('/special-offer/:sucursalId', carPartController.findSpecialOfferBySucursalId);

// router.get('/:carPartId', carPartController.getCarPart);
router.put('/:carPartId/:createdAt', carPartController.updateCarPart);
router.delete('/:carPartId/:createdAt', carPartController.deleteCarPart);

module.exports = router;
