/*
* @imageConvert.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
const dotenv = require('dotenv');
const { ImageCommand } = require('../imageConverter/imageCommand.js');
const { Execute } = require('../Execute.js');

dotenv.config({ path: __dirname + './../../../.env' });

const newImageFile = 'test.jpg';
const newImageFileName = 'test';
const imageOutExtension = 'jpg';
// Creates a new object image for image commands
const image = new ImageCommand();
// Creates an object for executing the commands that were sent
const execute = new Execute();
// Adds the input file with its address to convert
image.inputFile = `${'../imageConverter/inputs/'}${newImageFile}`;
// Adds the extension of the wanted output file
image.outExtension = imageOutExtension;
// Sets the dimensions of the output file
image.newWidth = 100;
image.newHeight = 100;
// Sets the type of the output file
image.typeOfOutput = 'grayscale';
// Sets the degrees to rotate clock wisw CW
image.rotateCW = 90;
// Creates the output path according to design
const imageOutFilePath = `${'../imageConverter/outputs/'}${newImageFileName}.${imageOutExtension}`;
image.convertedFilePath = imageOutFilePath;
// Gets the command to execute the desired action
const command = image.getCommand();
console.log(command);
// Converts the input file and returns the state of the conversion
execute.command(command, image.convertedFilePath);
