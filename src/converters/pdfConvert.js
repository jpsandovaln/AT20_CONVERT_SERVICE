const dotenv = require('dotenv');
const { pdfCommand } = require('./pdfConverter/pdfCommand.js');
const { Execute } = require('./Execute.js');

dotenv.config({path: __dirname + '/../../.env'});

const newFile = 'test.pdf';
const outExtension = 'jpg';
//Creates a new object audio for image commands
let pdf = new pdfCommand();
//Creates an object for executing the commands that were sent
let execute = new Execute();
//Adds the input file with its address to convert
pdf.inputFile = `${process.env.UPLOADS_PATH_PDF}${newFile}`;
//Adds the extension of the images output files
pdf.outExtension = outExtension;
//Sets the parameters of convertion
pdf.newDensity = 150;
pdf.newQuality = 90;
//Creates the output path according to design
const outFilePath = `${process.env.DOWNLOAD_PATH_PDF}${pdf.fileName(newFile)}.${outExtension}`;
pdf.convertedFilePath = outFilePath;
//Gets the command to execute the desired action
let command = pdf.getCommand();
console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, pdf.convertedFilePath);