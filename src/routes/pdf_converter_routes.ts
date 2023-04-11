/*
* @pdf_converter_routes.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
export{};
const express = require('express');
const router = express.Router();
// Importing the `PdfConverterController` class from the `pdf_converter_controller.ts` file.
const PdfConverterController = require('../controllers/pdf_converter_controller');
// Importing the `uploadPdf` function from the `converter_middleware.ts` file.
const { uploadPdf } = require('../middlewares/converter_middleware');
const converter = new PdfConverterController();
// A route that is being defined.
router.post('/converter', uploadPdf, converter.post);
// This is a route that will be used to download the converted file.
router.get('/download', converter.get);
module.exports = router;
