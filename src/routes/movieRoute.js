const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.post('/', movieController.createMovie);

router.get('/:sucursalId', movieController.findMoviesBySucursalId);
router.get('/sucursal/:sucursalId/id/:id', movieController.findById);

router.put('/:movieId/:createdAt', movieController.updateMovie);
router.delete('/:movieId/:createdAt', movieController.deleteMovie);

module.exports = router;
