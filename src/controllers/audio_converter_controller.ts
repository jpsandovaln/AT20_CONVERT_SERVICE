/*
* @audio_converter_controller.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { AudioCommand } = require('../service/audioConverter/audioCommand.js');
const { Execute } = require('../service/Execute.js');
//const { next } = require('process');
const path = require('path');
class AudioConverterController {
    /**
     * Receives a file and converts it to the specified audio format.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object to be sent back to the client.
     * @returns {Object} The response of the audioConverter.run function.
     */
    async post(req, res ) {
        const typeTo:string = req.body.typeTo;
        const bitRate:string = req.body.bitRate;
        const duration:number = req.body.duration;
        const codec:string = req.body.codec;
        const file:any = req.file;

        // Check if the file is not null, otherwise return an error.
        if (!file) {
            const error = new Error('Please upload an audio file.');
            console.log(error);
            //return next(error);
        }

        // Get the name of the file that will be converted.
        const saveFileName:string = path.parse(file.filename).name;
        const pathAudio:string = file.path;
        const extFileName:string = (path.parse(file.filename).ext).toString();
        let ext:string|undefined = typeTo;
        let fileExt:string|undefined = extFileName.split('.').pop();

        if (ext === undefined) {
            ext = fileExt;
        }

        /* Create a new instance of the AudioCommand class and set the inputFile,
           outExtension, bitRate and convertedFilePath. */
        const audioConverter = new AudioCommand();
        const execute = new Execute();
        audioConverter.inputFile = pathAudio;
        audioConverter.outExtension = typeTo;
        audioConverter.bitRate = bitRate;
        audioConverter.duration = duration;
        audioConverter.codec = codec;
        const outputAudiofile:string = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${ext}`;
        audioConverter.convertedFilePath = outputAudiofile;
        const command = audioConverter.getCommand();

        // This is a promise that waits for the response of the audioConverter.run function.
        try {
            const response:any = await execute.command(command, audioConverter.convertedFilePath);
            const downloadUrl:string = `${req.protocol}://${req.get('host')}/api/v1.0/convert_audio/download?src=${encodeURIComponent(outputAudiofile)}`;

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
     * Downloads the file from the server to the client.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
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
                error: error
            });
        }
    }
}
module.exports = AudioConverterController;
