const { AudioCommand } = require('../converters/audioConverter/audioCommand.js');
const { Execute } = require('../converters/Execute.js');
const { next } = require('process');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');

/* A class that is used to convert audio files from one format to another */
class DOWNConverterController {
    async post(req, res) {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let file = req.files.audio;
                file.mv('./uploads/' + file.name);//aca path de guardado que se encuentra en aca ahcer apra cada uno

                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size,
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async get(req, res) {
        const fileName = req.query.fileName;
        const type = req.query.type;
        if (type == 'audio') {
            const file = process.env.DOWNLOAD_PATH_AUDIO + fileName;
            res.download(file); // Set disposition and send it.
        } else if (type == 'video') {
            const file = process.env.DOWNLOAD_PATH_VIDEO + fileName;
            res.download(file); // Set disposition and send it.
        } else if (type == 'image') {
            const file = process.env.DOWNLOAD_PATH_IMAGE + fileName;
            res.download(file); // Set disposition and send it.
        }
    }
}
module.exports = DOWNConverterController;