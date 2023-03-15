const { VideoCommand } = require('../converters/videoConverter/videoCommand');
const { Execute } = require('../converters/Execute.js');
const { next } = require('process');
const path = require('path');
/* A class that is used to convert audio files from one format to another */
class VideoConverterController {
    async post(req, res) {
        /* Creating an object with the properties of the request body. */
        const file = req.file;
        const videoReq = {
            width : req.body.width,
            height : req.body.height,
            ext : req.body.ext,
            aspectRatio : req.body.aspect_ratio,
        };
        if (!file) {
            const error = new error('Please upload an Image');
            return next(error);
        }
        const extFileName = path.parse(file.filename).ext;
        var fileExt = extFileName.split('.').pop();
        if (videoReq.ext === undefined) {
            videoReq.ext = fileExt;
        }
        const saveFileName = path.parse(file.filename).name;
        /* Creating a new instance of the VideoCommand class. */
        var videoConverter = new VideoCommand();
        /* Creating a new instance of the Execute class. */
        const execute = new Execute();
        /* Setting the values of the properties of the VideoCommand class. */
        videoConverter.inputFile = file.path;
        videoConverter.outExtension = videoReq.ext;
        videoConverter.newWidth = videoReq.width;
        videoConverter.newHeight = videoReq.height;
        videoConverter.aspectRatio = videoReq.aspectRatio;
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_VIDEO}/${saveFileName}.${videoReq.ext}`;
        videoConverter.convertedFilePath = outputAudiofile;
        /* Calling the getCommand() method of the VideoCommand class. */
        var command = videoConverter.getCommand();
        try {
            const response = await execute.command(command, videoConverter.convertedFilePath);
            res.send(response);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor' + error,
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
module.exports = VideoConverterController;