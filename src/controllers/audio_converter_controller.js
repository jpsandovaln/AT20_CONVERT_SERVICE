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

const { AudioCommand } = require('../converters/audioConverter/audioCommand.js');
const { Execute } = require('../converters/Execute.js');
const { next } = require('process');
const path = require('path');


class AudioConverterController {
    /**
     * Receives a file and converts it to the specified audio format.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object to be sent back to the client.
     * @returns {Object} The response of the audioConverter.run function.
     */
    async post(req, res) {
        const typeTo = req.body.typeTo;
        const bitRate = req.body.bitRate;
        const file = req.file;

        /* Check if the file is not null, otherwise return an error. */
        if (!file) {
            const error = new Error('Please upload an audio file.');
            return next(error);
        }

        /* Get the name of the file that will be converted. */
        const saveFileName = path.parse(file.filename).name;
        const pathAudio = file.path;
        const extFileName = path.parse(file.filename).ext;
        let ext = typeTo;
        let fileExt = extFileName.split('.').pop();

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
        const outputAudiofile = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${ext}`;
        audioConverter.convertedFilePath = outputAudiofile;
        const command = audioConverter.getCommand();

        /* This is a promise that waits for the response of the audioConverter.run function. */
        try {
            const response = await execute.command(command, audioConverter.convertedFilePath);
            res.send(response);
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
            const file = req.query;
            const downloadFile = file.src;
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