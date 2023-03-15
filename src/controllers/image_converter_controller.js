const { ImageCommand } = require('../converters/imageConverter/imageCommand');
const { Execute } = require('../converters/Execute.js');
const { next } = require('process');
const path = require('path');
/* A class that is used to convert audio files from one format to another */
class ImageConverterController {
    async post(req, res) {
        /* Getting the parameters from the request body. */
        const imageReq = {
            width : req.body.width,
            height : req.body.height,
            ext : req.body.ext,
            rotate : req.body.rotate,
            colors : req.body.colors,
        };
        /* Checking if the file is being uploaded. */
        const file = req.file;
        if (!file) {
            const error = new error('Please upload an Image');
            return next(error);
        }
        /* Getting the extension of the file that is being uploaded. */
        const extFileName = path.parse(file.filename).ext;
        var fileExt = extFileName.split('.').pop();
        if (imageReq.ext === undefined) {
            imageReq.ext = fileExt;
        }
        //const saved_ext_name = path.parse(file.filename).ext;
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
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_IMAGE}/${saveFileName}.${imageReq.ext}`;
        imageConverter.convertedFilePath = outputAudiofile;
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

    get(req, res) {
        try {
            const file = req.query;
            const downloadFile = file.src;
            res.download(downloadFile); // Set disposition and send it.
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