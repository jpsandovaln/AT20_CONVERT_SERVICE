const { pdfCommand } = require('../converters/pdfConverter/pdfCommand');
const { Execute } = require('../converters/Execute');
const { next } = require('process');
const path = require('path');
const fs = require('fs');


/* A class that is used to convert audio files from one format to another */
class PdfConverterController {
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
            res.send(response);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor ' + error,
                error: error
            });
        }
    }

    get(req, res) {
        try {
            const file = req.query;
            const downloadFile = file.src;
            res.zip(downloadFile); // Set disposition and send it.
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