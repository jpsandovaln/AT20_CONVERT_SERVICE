/*
* @pdf_converter_controller.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { pdfCommand } = require('../service/pdfConverter/pdfCommand');
const { Execute } = require('../service/Execute');
const { next } = require('process');
const path = require('path');
const fs = require('fs');


class PdfConverterController {
    /**
     * It receives a PDF file, converts it to the desired format and returns the state of the
     * conversion
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response of the conversion.
     */
    async post(req, res) {
        /* Getting the parameters from the request body and the file from the request. */
        const typeTo = req.body.typeTo;
        const density = req.body.density;
        const quality = req.body.quality;
        const file = req.file;
        if (!file) {
            const error = new error('Please upload a PDF');
            return next(error);
        }
        const saveFileName = path.parse(file.filename).name;
        const pathPdf = file.path;
        const extFileName = path.parse(file.filename).ext;
        var ext = typeTo;
        var fileExt = extFileName.split('.').pop();
        if (ext === undefined) {
            ext = fileExt;
        }
        //Creates a new object audio for image commands
        const pdf = new pdfCommand();
        //Creates an object for executing the commands that were sent
        const execute = new Execute();
        //Adds the input file with its address to convert
        pdf.inputFile = pathPdf;
        //Adds the extension of the images output files
        pdf.outExtension = ext;
        //Sets the parameters of convertion
        pdf.newDensity = density;
        pdf.newQuality = quality;
        const folderName = `${process.env.DOWNLOAD_PATH_PDF}/${saveFileName}`;
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err);
        }
        //Creates the output path according to design
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_PDF}/${saveFileName}/${saveFileName}.${ext}`;
        pdf.convertedFilePath = outputAudiofile;
        //Gets the command to execute the desired action
        let command = pdf.getCommand();
        //Converts the input file and returns the state of the conversion
        try {
            const response = await execute.command(command, folderName);
            const downloadUrl = `${req.protocol}://${req.get('host')}/download?src=${encodeURIComponent(outputAudiofile)}`;

            // Update the response object to include the download URL
            const updatedResponse = {
                stdout: response.stdout,
                downloadUrl: downloadUrl,
            };

            res.send(updatedResponse);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Server error: ' + error,
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
    async get(req, res) {
        try {
            const file = req.query;
            const downloadFile = file.src;
            await res.zip({
                files: [
                    {   content: 'pdf_image',
                        name: `${downloadFile}`,
                        date: new Date(),
                        type: 'file' },

                    { path: `${downloadFile}` }
                ],
                filename: `${downloadFile}`
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor ' + error,
                error: error
            });
        }
    }
}
module.exports = PdfConverterController;