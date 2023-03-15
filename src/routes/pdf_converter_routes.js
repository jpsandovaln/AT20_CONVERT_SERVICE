const express = require('express');
const router = express.Router();
const PdfConverterController = require('../controllers/pdf_converter_controller');
const { uploadPdf } = require('../middlewares/converter_middleware.js');

const converter = new PdfConverterController();
/* A route that is being defined. */
router.post('/converter', uploadPdf, converter.post);
/* This is a route that will be used to download the converted file. */
router.get('/download', converter.get);
module.exports = router;
