const express = require('express');
const router = express.Router();
const AudioConverterController = require('../controllers/audio_converter_controller.js');
const { uploadAudio } = require('../middlewares/converter_middleware.js');

const converter = new AudioConverterController();
/* A route that is being defined. */
router.post('/converter', uploadAudio, converter.post);

module.exports = router;
