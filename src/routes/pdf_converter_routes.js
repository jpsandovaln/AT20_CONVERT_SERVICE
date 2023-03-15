const express = require('express');
const router = express.Router();
const PdfConverterController = require('../controllers/pdf_converter_controller');
const { uploadPdf } = require('../middlewares/converter_middleware.js');

const converter = new PdfConverterController();
/* A route that is being defined. */
router.post('/converter', uploadPdf, converter.post);

module.exports = router;
