const express = require('express');
const playListController = require('../controllers/playListController');

const router = express.Router();

router.post('/', playListController.add);

router.get('/user/:userId', playListController.findByUserId);

module.exports = router;
