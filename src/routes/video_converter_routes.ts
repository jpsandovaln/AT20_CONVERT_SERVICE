/*
* @video_converter_routes.js Copyright(c) 2023 Jalasoft
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
// Importing the video_converter_controller.ts file.
const VideoConverterController = require('../controllers/video_converter_controller');
// Importing the uploadVideo function from the converter_middleware.ts file.
const { uploadVideo } = require('../middlewares/converter_middleware');
// Creating a new instance of the VideoConverterController class.
const converter = new VideoConverterController();
// A route that is being defined.
router.post('/converter', uploadVideo, converter.post);
// This is a route that will be used to download the converted file.
router.get('/download', converter.get);
module.exports = router;
