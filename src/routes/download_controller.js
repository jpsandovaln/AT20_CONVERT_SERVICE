const express = require('express');
const router = express.Router();
const AudioConverterController = require('../controllers/download_controller.js');

const converter = new AudioConverterController();

/* Defining a route. */
router.get('/download', converter.post);

module.exports = router;
