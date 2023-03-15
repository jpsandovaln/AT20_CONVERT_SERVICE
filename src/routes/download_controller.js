const express = require('express');
const router = express.Router();
const AudioConverterController = require('../controllers/download_controller.js');

const converter = new AudioConverterController();
/* A route that is being defined. */
router.get('/download', converter.post);

module.exports = router;
