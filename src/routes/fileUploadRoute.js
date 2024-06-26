const express = require('express');
const fileUploadController = require('../controllers/fileUploadController');

const router = express.Router();

router.post('/upload', fileUploadController.uploadFiles);
router.post('/urls', fileUploadController.getImagesFromS3);
router.delete('/:fileName', fileUploadController.deleteFileFromS3);

module.exports = router;
