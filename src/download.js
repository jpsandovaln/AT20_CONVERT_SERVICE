/*
@Command.js Copyright(c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

/* A middleware that is used to upload the file to the server. */
app.use(fileUpload({
    createParentPath: true
}));

/* Parsing the body of the request. */
app.use(bodyParser.json());
/* A middleware that parses the body of the request. */
app.use(bodyParser.urlencoded({extended: true}));
/* A middleware that logs all the requests to the console. */
app.use(morgan('dev'));

app.listen(3000, () =>
    console.log('App is listening on port 3000')
);

/* This is the code for uploading the file to the server. */
app.post('/upload', async (req, res) => {
    try {
        /* Checking if there is a file uploaded. */
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.audio;
            file.mv('./uploads/' + file.name);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Downloading the file from the server. */
app.get('/download', function(req, res) {
    const fileName = req.query.x;
    const file = `${__dirname}/downloads/` + fileName;
    res.download(file); // Set disposition and send it.
});
