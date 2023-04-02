"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
// This is importing the AudioConverterController class from the audio_converter_controller.js file.
const AudioConverterController = require('../controllers/audio_converter_controller');
// This is importing the uploadAudio function from the converter_middleware.js file.
const { uploadAudio } = require('../middlewares/converter_middleware');
// Creating a new instance of the AudioConverterController class.
const converter = new AudioConverterController();
// Defining a route that will be used to post a file to the server.
router.post('/converter', uploadAudio, converter.post);
// This is a route that will be used to download the converted file.
router.get('/download', converter.get);
module.exports = router;
