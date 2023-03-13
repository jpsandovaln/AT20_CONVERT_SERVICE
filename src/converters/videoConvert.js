
const dotenv = require('dotenv');
const { VideoCommand } = require ('./videoConverter/videoCommand.js');

dotenv.config({path: __dirname + '/../../.env'});

const newVideoFile = 'maxwell.mp4';
const videoOutExtension = 'mp4';

var video = new VideoCommand();
video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
video.outExtension = videoOutExtension;
video.newWidth = 420;
video.newHeight = 240;
video.aspectRatio = '4:3';
const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${video.fileName(newVideoFile)}.${videoOutExtension}`;
video.convertedFilePath = videoOutFilePath;
var command = video.getCommand();
console.log(command);
video.convert(command, video.convertedFilePath);

