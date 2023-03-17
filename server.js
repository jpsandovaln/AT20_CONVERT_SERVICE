/*
* @server.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/


// Importing the express module. 
const express = require('express');
// Used to load environment variables from a .env file into process.env.
const dotenv = require('dotenv');
// Importing the audio_converter_routes.js file.
const audioConverter = require('./src/routes/audio_converter_routes.js');
// Importing the video_converter_routes.js file.
const videoConverter = require('./src/routes/video_converter_routes');
// Importing the image_converter_routes.js file.
const imageConverter = require('./src/routes/image_converter_routes');
// Importing the pdf_converter_routes.js file.
const pdfConverter = require('./src/routes/pdf_converter_routes');
// Used to zip the files.
var zip = require('express-easy-zip');

const app = express();
app.use(zip());
dotenv.config();


/* A middleware that is used to route the request to the appropriate route. */
app.use('/api/v1.0/convert_audio', audioConverter);
app.use('/api/v1.0/convert_video', videoConverter);
app.use('/api/v1.0/convert_image', imageConverter);
app.use('/api/v1.0/convert_pdf', pdfConverter);


const PORT = process.env.PORT || 9090;

/* Used to start the server. */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
