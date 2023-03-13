const dotenv = require('dotenv');
const { ImageCommand } = require('./imageConverter/imageCommand.js');

dotenv.config({path: __dirname + '/../../.env'});

const newImageFile = 'test.jpg';
const imageOutExtension = 'jpg';
//Creates a new object audio for image commands
var image = new ImageCommand();
//Adds the input file with its address to convert
image.inputFile = `${process.env.UPLOADS_PATH_IMAGE}${newImageFile}`;
//Adds the extension of the wanted output file
image.outExtension = imageOutExtension;
//Sets the dimensions of the output file
image.newWidth = 100;
image.newHeight = 100;
//Sets the type of the output file
image.typeOfOutput = 'grayscale';
//Sets the degrees to rotate clock wisw CW
image.rotateCW = 90;
//Creates the output path according to design
const imageOutFilePath = `${process.env.DOWNLOAD_PATH_IMAGE}${image.fileName(newImageFile)}.${imageOutExtension}`;
image.convertedFilePath = imageOutFilePath;
//Gets the command to execute the desired action
var command = image.getCommand();
console.log(command);
//Converts the input file and returns the state of the conversion
image.convert(command, image.convertedFilePath);