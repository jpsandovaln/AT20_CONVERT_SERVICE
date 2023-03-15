const dotenv = require('dotenv');
const { pdfCommand } = require('./pdfConverter/pdfCommand.js');
const { Execute } = require('./Execute.js');

dotenv.config({path: __dirname + '/../../.env'});

//const newFile = 'test.pdf';
const outExtension = 'jpg';
//Creates a new object audio for image commands
let pdf = new pdfCommand();
//Creates an object for executing the commands that were sent
let execute = new Execute();
//Adds the input file with its address to convert
pdf.inputFile = 'C:/at.jala/at20_p4/AT20_CONVERT_SERVICE/src/converters/pdfConverter/inputs/test.pdf';
//Adds the extension of the images output files
pdf.outExtension = outExtension;
//Sets the parameters of convertion
pdf.newDensity = 150;
pdf.newQuality = 90;
//Creates the output path according to design
const outFilePath = 'C:/at.jala/at20_p4/AT20_CONVERT_SERVICE/src/converters/pdfConverter/outputs/test.jpg';
pdf.convertedFilePath = outFilePath;
//Gets the command to execute the desired action
let command = pdf.getCommand();
console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, pdf.convertedFilePath);