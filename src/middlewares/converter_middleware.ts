/*
* @converter_middleware.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
export{};
const multer = require('multer');
const path = require('path');

// Creating a storage for the audio files.
const storageAudio = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOADS_PATH_AUDIO);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext:string = path.extname(file.originalname);
        const fileName:string = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});
// Creating a storage for the video files.
const storageVideo = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOADS_PATH_VIDEO);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext:string = path.extname(file.originalname);
        const fileName:string = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});
// Creating a storage for the image files.
const storageImages = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOADS_PATH_IMAGE);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext:string = path.extname(file.originalname);
        const fileName:string = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});
// Creating a storage for the pdf files.
const storagePdf = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOADS_PATH_PDF);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext:string = path.extname(file.originalname);
        const fileName:string = path.basename(file.originalname, ext);
        cb(null, fileName + '-' + uniqueSuffix + ext);
    }
});
// Creating a storage for the audio, video and image files.
const uploadAudio = multer({ storage: storageAudio }).single('audio');
const uploadVideo = multer({ storage: storageVideo }).single('video');
const uploadImage = multer({ storage: storageImages }).single('image');
const uploadPdf = multer({ storage: storagePdf }).single('pdf');

module.exports = { uploadAudio, uploadVideo, uploadImage, uploadPdf };
