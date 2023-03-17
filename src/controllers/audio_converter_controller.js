const { AudioCommand } = require('../service/audioConverter/audioCommand.js');
const { Execute } = require('../service/Execute.js');
const { next } = require('process');
const path = require('path');

/* A class that is used to convert audio files from one format to another */
class AudioConverterController {
    async post(req, res) {
        const typeTo = req.body.typeTo;
        const bitRate = req.body.bitRate;
        const file = req.file;
        if (!file) {
            const error = new error('Please upload an Audio');
            return next(error);
        }
        /* Getting the name of the file that is going to be converted. */
        const saveFileName = path.parse(file.filename).name;
        const pathAudio = file.path;
        const extFileName = path.parse(file.filename).ext;
        var ext = typeTo;
        var fileExt = extFileName.split('.').pop();
        if (ext === undefined) {
            ext = fileExt;
        }
        /* This is creating a new instance of the AudioCommand class, and then it is setting the inputFile,
        outExtension, bitRate and convertedFilePath. */
        const audioConverter = new AudioCommand();
        const execute = new Execute();
        audioConverter.inputFile = pathAudio;
        audioConverter.outExtension = typeTo;
        audioConverter.bitRate = bitRate;
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${ext}`;
        audioConverter.convertedFilePath = outputAudiofile;
        var command = audioConverter.getCommand();
        /* This is a promise, it is waiting for the response of the audioConverter.run function. */
        try {
            const response = await execute.command(command, audioConverter.convertedFilePath);
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
     * It downloads the file from the server to the client
     * @param req - The request object.
     * @param res - The response object.
     */
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
module.exports = AudioConverterController;