/**
@videoConvert.js Copyright(c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const dotenv = require('dotenv');
const { VideoCommand } = require ('../videoConverter/videoCommand.js');
const { Execute } = require('../Execute.js');
dotenv.config({path: __dirname + './../../../.env'});

const newVideoFile = 'maxwell.mp4';
const videoOutExtension = 'mp4';
//Creates a new object video for video commands
var video = new VideoCommand();
//Creates an object for executing the commands that were sent
var execute = new Execute();
//Adds the input file with its address to convert
video.inputFile = `${'../videoConverter/inputs/'}${newVideoFile}`;
//Adds the extension of the wanted output file
video.outExtension = videoOutExtension;
//Sets the dimensions of the output file
video.newWidth = 420;
video.newHeight = 240;
//Sets the aspect ratio of the output file
video.aspectRatio = '4:3';
//Creates the output path according to design
const videoOutFilePath = `${'../videoConverter/outputs/'}${video.fileName(newVideoFile)}.${videoOutExtension}`;
//Sets the output path of the converted file
video.convertedFilePath = videoOutFilePath;
//Gets the command to execute the desired action
var command = video.getCommand();
console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, video.convertedFilePath);

