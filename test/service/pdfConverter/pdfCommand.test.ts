/*
* @pdfConvert.test.js Copyright(c) 2023 Jalasoft
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
import { pdfCommand } from '../../../src/service/pdfConverter/pdfCommand';
import { Execute } from '../../../src/service/Execute';

dotenv.config({ path: __dirname + '../../../../.env'});

describe('This is the test suite for the pdf convert service', () => {
    it('Should return the command to be executed according to the requirements previously inserted', () => {
        // Define the input file name.
        const newFile: string = 'test.pdf';
        // Define the output files base name and extension.
        const newFileName: string = 'test';
        const outExtension: string = 'jpg';
        // Creates a new instance of the pdfCommand class.
        const pdf: pdfCommand = new pdfCommand();
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
        const expectedCommand = 'magick -density 150 ./src/service/pdfConverter/inputs/test.pdf[0] -quality 90 ./src/service/pdfConverter/outputs/test.jpg';
        expect(command).toBe(expectedCommand);
    });

    it('Should return an acknowledge message after a successful conversion', async () => {
        // Define the input file name.
        const newFile: string = 'test.pdf';
        // Define the output files base name and extension.
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
        const result = await execute.command(command, pdf.convertedFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });
    it('Should return the path of the converted file after a successful conversion', async () => {
        // Define the input file name.
        const newFile: string = 'test.pdf';
        // Define the output files base name and extension.
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
        // Gets the command to execute the desired action.
        const command = pdf.getCommand();
        // Printing the command to the console.
        const result = await execute.command(command, pdf.convertedFilePath);
        const outPath = './src/service/pdfConverter/outputs/test.jpg';
        expect(result.outputPath).toBe(outPath);
    });
});
