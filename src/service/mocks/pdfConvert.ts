/*
* @pdfConvert.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
import dotenv from 'dotenv';
import { pdfCommand } from '../pdfConverter/pdfCommand';
import { Execute } from '../Execute';

dotenv.config({path: __dirname + './../../../.env'});

// Define the input file name.
const newFile: string = 'test.pdf';
const newFileName: string = 'test';
const outExtension: string = 'jpg';
// Creates a new instance of the pdfCommand class.
const pdf: pdfCommand = new pdfCommand();
// Creates a new instance of the Execute class.
const execute: Execute = new Execute();
// Adds the input file with its address to convert
pdf.inputFile = `${process.env.UPLOADS_PATH_PDF}${newFile}`;
// Adds the extension of the images output files
pdf.outExtension = outExtension;
// Sets the density and quality of the output images.
pdf.density = 150;
pdf.quality = 90;
// Creates the output path for the converted file.
const outFilePath = `${process.env.DOWNLOAD_PATH_PDF}${newFileName}.${outExtension}`;
pdf.convertedFilePath = outFilePath;
// Sets the page range to convert.
pdf.newPageRange(0, 0);
// Gets the command to execute the desired action.
const command: string = pdf.getCommand();
// Printing the command to the console.
// console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, pdf.convertedFilePath);