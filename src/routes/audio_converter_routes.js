const express = require('express');
const router = express.Router();
const AudioConverterController = require('../controllers/audio_converter_controller.js');
const { uploadAudio } = require('../middlewares/converter_middleware.js');

const converter = new AudioConverterController();
/* Defining a route that will be used to post a file to the server. */
router.post('/converter', uploadAudio, converter.post);
/* This is a route that will be used to download the converted file. */
router.get('/download', converter.get);
module.exports = router;
