const express = require('express');
const router = express.Router();
const ImageConverterController = require('../controllers/image_converter_controller');
const { uploadImage } = require('../middlewares/converter_middleware.js');

const converter = new ImageConverterController();
/* A route that is being defined. */
router.post('/converter', uploadImage, converter.post);

module.exports = router;
