const express = require('express');
const router = express.Router();
const ImageConverterController = require('../controllers/image_converter_controller');
const { uploadImage } = require('../middlewares/converter_middleware.js');

const converter = new ImageConverterController();
/* Defining a route that will be used to post a request to the server. */
router.post('/converter', uploadImage, converter.post);
/* This is a route that will be used to download the converted file. */
router.get('/download', converter.get);
module.exports = router;
