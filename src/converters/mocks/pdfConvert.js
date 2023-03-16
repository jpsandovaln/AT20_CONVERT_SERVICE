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

/* Importing the dotenv module, the pdfCommand module and the Execute module. */
const dotenv = require('dotenv');
const { pdfCommand } = require('../pdfConverter/pdfCommand');
const { Execute } = require('../Execute');

/* Loading the environment variables from the .env file. */
dotenv.config({path: __dirname + './../../../.env'});

/* Just defining the input and output file names. */
const newFile = 'test.pdf';
const outExtension = 'jpg';
/* Creating a new instance of the pdfCommand class. */
let pdf = new pdfCommand();
/* Creating a new instance of the Execute class. */
let execute = new Execute();
//Adds the input file with its address to convert
pdf.inputFile = `${process.env.UPLOADS_PATH_PDF}${newFile}`;
//Adds the extension of the images output files
pdf.outExtension = outExtension;
/* Setting the density and quality of the output images. */
pdf.newDensity = 150;
pdf.newQuality = 90;
/* Creating the output path for the converted file. */
const outFilePath = `${process.env.DOWNLOAD_PATH_PDF}${pdf.fileName(newFile)}.${outExtension}`;
pdf.convertedFilePath = outFilePath;
/* Setting the page range to convert. */
pdf.newPageRange(0, 0);
/* Getting the command to execute the desired action. */
let command = pdf.getCommand();
/* Printing the command to the console. */
console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, pdf.convertedFilePath);