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
export{};
const { ImageCommand } = require('../service/imageConverter/imageCommand');
const { Execute } = require('../service/Execute.js');
//const { next } = require('process');
const path = require('path');
class ImageConverterController {
    /**
     * It receives a request with an image, and returns a converted image
     * @param req - The request object.
     * @param res - The response object.
     * @returns The converted image.
     */
    async post(req, res) {
        // Getting the image conversion options from the request body.
            const width:number = req.body.width;
            const height:number = req.body.height;
            let ext:string|undefined = req.body.ext;
            const rotate:number = req.body.rotate;
            const colors:string = req.body.colors;

        // Checking if the file is being uploaded.
        const file:any = req.file;
        if (!file) {
            const error = new Error('Please upload an image');
            console.log(error);
            //return next(error);
        }

        // Getting the extension of the file that is being uploaded.
        const extFileName:string = path.parse(file.filename).ext;
        let fileExt:string|undefined = extFileName.split('.').pop();
        if (ext === undefined) {
            ext = fileExt;
        }
        const saveFileName:string = path.parse(file.filename).name;
        const pathImage:string = file.path;
        const imageConverter = new ImageCommand();
        const execute = new Execute();
        // Adds the input file with its address to convert
        imageConverter.inputFile = pathImage;
        // Adds the extension of the wanted output file
        imageConverter.outExtension = ext;
        // Sets the dimensions of the output file
        imageConverter.newWidth = width;
        imageConverter.newHeight = height;
        // Sets the type of the output file
        imageConverter.typeOfOutput = colors;
        // Sets the degrees to rotate clock wisw CW
        imageConverter.rotateCW = rotate;
        // Creating the path where the converted file is going to be saved.
        const outputImageFile:string = `${process.env.DOWNLOAD_PATH_IMAGE}/${saveFileName}.${ext}`;
        imageConverter.convertedFilePath = outputImageFile;
        // Gets the command to execute the desired action
        const command = imageConverter.getCommand();

        // Executing the command that is going to convert the image.
        try {
            const response:any = await execute.command(command, imageConverter.convertedFilePath);
            const downloadUrl:string = `${req.protocol}://localhost:9090/api/v1.0/convert_image/download?src=${encodeURIComponent(outputImageFile)}`;
            console.log(downloadUrl);
            // Update the response object to include the download URL
            const updatedResponse = {
                stdout: response.stdout,
                downloadUrl
            };
            res.send(updatedResponse);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Server error: ' + error,
                error
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
            const file:any = req.query;
            const downloadFile:string = file.src;
            res.download(downloadFile);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Server error: ' + error,
                error
            });
        }
    }
}
module.exports = ImageConverterController;
