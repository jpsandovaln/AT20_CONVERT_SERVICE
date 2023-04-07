/*
* @video_converter_controller.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { VideoCommand } = require('../service/videoConverter/videoCommand');
const { Execute } = require('../service/Execute.js');
const { next } = require('process');
const path = require('path');

class VideoConverterController {
    /**
     * Creates an object with the properties of the request body, creates a new instance of the
     * VideoCommand class, sets the values of the properties of the VideoCommand class, calls the
     * getCommand() method of the VideoCommand class, and finally calls the command() method of the
     * Execute class.
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response of the command execution.
     */
    async post (req, res) {
        /* Getting the file from the request and the videoReq is getting the width, height, ext, and
        aspect ratio from the request body. */
        const file = req.file;
        const videoReq = {
            width: req.body.width,
            height: req.body.height,
            ext: req.body.ext,
            aspectRatio: req.body.aspectratio,
            duration: req.body.duration,
            framerate: req.body.framerate,
            autoCodec: req.body.autoCodec,
            bitrate: req.body.bitrate
        };
        if (!file) {
            const error = new Error('Please upload an Image');
            return next(error);
        }
        const extFileName = path.parse(file.filename).ext;
        const fileExt = extFileName.split('.').pop();
        if (videoReq.ext === undefined) {
            videoReq.ext = fileExt;
        }
        const saveFileName = path.parse(file.filename).name;
        /* Creating a new instance of the VideoCommand class. */
        const videoConverter = new VideoCommand();
        /* Creating a new instance of the Execute class. */
        const execute = new Execute();
        /* Setting the values of the properties of the VideoCommand class. */
        videoConverter.inputFile = file.path;
        videoConverter.outExtension = videoReq.ext;
        videoConverter.newWidth = videoReq.width;
        videoConverter.newHeight = videoReq.height;
        videoConverter.aspectRatio = videoReq.aspectRatio;
        videoConverter.duration = videoReq.duration;
        videoConverter.newFrameRate = videoReq.frameRate;
        videoConverter.autoCodec = videoReq.autoCodec;
        videoConverter.bitrate = videoReq.bitrate;
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_VIDEO}/${saveFileName}.${videoReq.ext}`;
        videoConverter.convertedFilePath = outputAudiofile;
        /* Calling the getCommand() method of the VideoCommand class. */
        const command = videoConverter.getCommand();
        try {
            const response = await execute.command(command, videoConverter.convertedFilePath);
            const downloadUrl = `${req.protocol}://${req.get('host')}/api/v1.0/convert_video/download?src=${encodeURIComponent(outputAudiofile)}`;

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
    get (req, res) {
        try {
            const file = req.query;
            const downloadFile = file.src;
            res.download(downloadFile); // Set disposition and send it.
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error de servidor ' + error,
                error
            });
        }
    }
}
module.exports = VideoConverterController;
