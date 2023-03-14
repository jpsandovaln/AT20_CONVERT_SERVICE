const dotenv = require('dotenv');
const { ImageCommand } = require('./imageConverter/imageCommand.js');
const { Execute } = require('./Execute.js');

dotenv.config({path: __dirname + '/../../.env'});

const newImageFile = 'test.jpg';
const imageOutExtension = 'jpg';
//Creates a new object image for image commands
var image = new ImageCommand();
//Creates an object for executing the commands that were sent
var execute = new Execute();
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
execute.command(command, image.convertedFilePath);