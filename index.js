const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const { AudioCommand } = require('./src/converters/audioConverter/audioCommand.js');
const { ImageCommand } = require('./src/converters/imageConverter/imageCommand.js');
const { VideoCommand } = require('./src/converters/videoConverter/videoCommand.js');
dotenv.config();

/* Importing the multer module and the next function from the process module. */
const multer = require('multer');
const { next } = require('process');

/* Creating a storage for the audio files. */
const storageAudio = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.UPLOADS_PATH_AUDIO);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});

/* Creating a storage for the video files. */
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.UPLOADS_PATH_VIDEO);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});

/* Creating a storage for the image files. */
const storageImages = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.UPLOADS_PATH_IMAGE);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});

app.use(express.text());
/* Creating a storage for the audio, video and image files. */
const uploadAudio = multer({storage: storageAudio});
const uploadVideo = multer({storage: storageVideo});
const uploadImage = multer({storage: storageImages});


/* A post method that receives a file and the type of the file. */
app.post('/api/v1/upload_audio', uploadAudio.single('audio'), async (req, res) => {
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
    //first hardcode
    /* This is creating a new instance of the AudioCommand class, and then it is setting the inputFile,
    outExtension, bitRate and convertedFilePath. */
    const audioConverter = new AudioCommand();
    audioConverter.inputFile = pathAudio;
    audioConverter.outExtension = typeTo;
    audioConverter.bitRate = bitRate;
    const outputAudiofile = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${ext}`;
    audioConverter.convertedFilePath = outputAudiofile;
    var command = audioConverter.getCommand();
    /* This is a promise, it is waiting for the response of the audioConverter.run function. */
    try {
        const response = await audioConverter.convert(command, audioConverter.convertedFilePath);
        res.send(response);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor ' + error,
            error: error
        });
    }
});

//here the new post with
app.post('/api/v1/upload_image', uploadImage.single('image'), async (req, res) => {
    const imageReq = {
        width : req.body.width,
        height : req.body.height,
        ext : req.body.ext,
        rotate : req.body.rotate,
        colors : req.body.colors,
    };
    const file = req.file;
    if (!file) {
        const error = new error('Please upload an Image');
        return next(error);
    }
    const extFileName = path.parse(file.filename).ext;
    var fileExt = extFileName.split('.').pop();
    if (imageReq.ext === undefined) {
        imageReq.ext = fileExt;
    }
    //const saved_ext_name = path.parse(file.filename).ext;
    const saveFileName = path.parse(file.filename).name;
    const imageConverter = new ImageCommand();
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
    const outputAudiofile = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${imageReq.ext}`;
    imageConverter.convertedFilePath = outputAudiofile;
    //Gets the command to execute the desired action
    var command = imageConverter.getCommand();
    /* Executing the command that is going to convert the image. */
    try {
        const response = await imageConverter.convert(command, imageConverter.convertedFilePath);
        res.send(response);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor ' + error,
            error: error
        });
    }
});

app.post('/api/v1/upload_video', uploadVideo.single('video'), async (req, res) => {
    const videoReq = {
        width : req.body.width,
        height : req.body.height,
        ext : req.body.ext,
        aspectRatio : req.body.aspect_ratio,
    };
    const file = req.file;
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
    var videoConverter = new VideoCommand();
    videoConverter.inputFile = file.path;
    videoConverter.outExtension = videoReq.ext;
    videoConverter.newWidth = videoReq.width;
    videoConverter.newHeight = videoReq.height;
    videoConverter.aspectRatio = videoReq.aspectRatio;
    const outputAudiofile = `${process.env.DOWNLOAD_PATH_AUDIO}/${saveFileName}.${videoReq.ext}`;
    videoConverter.convertedFilePath = outputAudiofile;
    var command = videoConverter.getCommand();
    try {
        const response = await videoConverter.convert(command, videoConverter.convertedFilePath);
        res.send(response);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor' + error,
            error: error
        });
    }
});

app.listen(3000, ()=>{
    console.log('Server on port 3000');
});