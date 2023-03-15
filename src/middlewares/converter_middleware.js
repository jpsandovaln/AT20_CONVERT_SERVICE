const multer = require('multer');
const path = require('path');
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
/* Creating a storage for the pdf files. */
const storagePdf = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.UPLOADS_PATH_PDF);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});
/* Creating a storage for the audio, video and image files. */
const uploadAudio = multer({storage: storageAudio}).single('audio');
const uploadVideo = multer({storage: storageVideo}).single('video');
const uploadImage = multer({storage: storageImages}).single('image');
const uploadPdf = multer({storage: storagePdf}).single('pdf');
/* Exporting the functions to be used in other files. */
module.exports = {uploadAudio, uploadVideo, uploadImage, uploadPdf};
