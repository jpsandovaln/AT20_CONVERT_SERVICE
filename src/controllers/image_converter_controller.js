/*
* @image_converter_controller.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { ImageCommand } = require('../service/imageConverter/imageCommand');
const { Execute } = require('../service/Execute.js');
const { next } = require('process');
const path = require('path');

class ImageConverterController {
    /**
     * It receives a request with an image, and returns a converted image
     * @param req - The request object.
     * @param res - The response object.
     * @returns The converted image.
     */
    async post(req, res) {
        /* Getting the image conversion options from the request body. */
        const imageReq = {
            width: req.body.width,
            height: req.body.height,
            ext: req.body.ext,
            rotate: req.body.rotate,
            colors: req.body.colors,
        };
        /* Checking if the file is being uploaded. */
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload an image');
            return next(error);
        }
        /* Getting the extension of the file that is being uploaded. */
        const extFileName = path.parse(file.filename).ext;
        const fileExt = extFileName.split('.').pop();
        if (imageReq.ext === undefined) {
            imageReq.ext = fileExt;
        }
        const saveFileName = path.parse(file.filename).name;
        const imageConverter = new ImageCommand();
        const execute = new Execute();
        //Adds the input file with its address to convert
        imageConverter.inputFile = file.path;
        //Adds the extension of the wanted output file
        imageConverter.outExtension = imageReq.ext;
        //Sets the dimensions of the output file
        imageConverter.newWidth = imageReq.width;
        imageConverter.newHeight = imageReq.height;
        //Sets the type of the output file
        imageConverter.typeOfOutput = imageReq.colors;
        //Sets the degrees to rotate clock wisw CW
        imageConverter.rotateCW = imageReq.rotate;
        /* Creating the path where the converted file is going to be saved. */
        const outputImageFile = `${process.env.DOWNLOAD_PATH_IMAGE}/${saveFileName}.${imageReq.ext}`;
        imageConverter.convertedFilePath = outputImageFile;
        //Gets the command to execute the desired action
        var command = imageConverter.getCommand();
        /* Executing the command that is going to convert the image. */
        try {
            const response = await execute.command(command, imageConverter.convertedFilePath);
            res.send(response);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor ' + error,
                error: error
            });
        }
    }


    /**
     * The function takes a request object and a response object as parameters. It then uses the
     * request object to get the file name from the query string. It then uses the response object to
     * download the file
     * @param req - The request object.
     * @param res - The response object.
     */
    get(req, res) {
        try {
            const file = req.query;
            const downloadFile = file.src;
            res.download(downloadFile);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor ' + error,
                error: error
            });
        }
    }
}
module.exports = ImageConverterController;