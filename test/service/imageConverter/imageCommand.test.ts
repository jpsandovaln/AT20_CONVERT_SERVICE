/*
* @imageCommand.test.js Copyright(c) 2023 Jalasoft
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
import { ImageCommand } from '../../../src/service/imageConverter/imageCommand';
import { Execute } from '../../../src/service/Execute';

dotenv.config({ path: __dirname + '../../../../.env'});

describe('This is the test suite for the image convert service', () => {
    it('Should return the command to be executed according to the requirements previously inserted', () => {
        const newImageFile = 'test.jpg';
        const newImageFileName = 'test';
        const imageOutExtension = 'jpg';
        // Creates a new object image for image commands
        var image: ImageCommand = new ImageCommand();
        // Adds the input file with its address to convert
        image.inputFile = `${process.env.UPLOADS_PATH_IMAGE}${newImageFile}`;
        // Adds the extension of the wanted output file
        image.outExtension = imageOutExtension;
        // Sets the dimensions of the output file
        image.width = 100;
        image.height = 100;
        // Sets the type of the output file
        image.typeOfOutput = 'grayscale';
        // Sets the degrees to rotate clock wisw CW
        image.rotateCW = 90;
        // Creates the output path according to design
        const imageOutFilePath: string = `${process.env.DOWNLOAD_PATH_IMAGE}${newImageFileName}.${imageOutExtension}`;
        image.convertedFilePath = imageOutFilePath;
        // Gets the command to execute the desired action
        var command: string = image.getCommand();
        const expectedCommand = 'magick ./src/service/imageConverter/inputs/test.jpg -resize 100x100 -type grayscale -rotate 90 ./src/service/imageConverter/outputs/test.jpg';
        expect(command).toBe(expectedCommand);
    });

    it('Should return an acknowledge message after a successful conversion', async () => {
        const newImageFile = 'test.jpg';
        const newImageFileName = 'test';
        const imageOutExtension = 'png';
        // Creates a new object image for image commands
        var image: ImageCommand = new ImageCommand();
        // Creates an object for executing the commands that were sent
        var execute: Execute = new Execute();
        // Adds the input file with its address to convert
        image.inputFile = `${process.env.UPLOADS_PATH_IMAGE}${newImageFile}`;
        // Adds the extension of the wanted output file
        image.outExtension = imageOutExtension;
        // Sets the dimensions of the output file
        image.width = 100;
        image.height = 100;
        // Sets the type of the output file
        image.typeOfOutput = 'grayscale';
        // Sets the degrees to rotate clock wisw CW
        image.rotateCW = 180;
        // Creates the output path according to design
        const imageOutFilePath: string = `${process.env.DOWNLOAD_PATH_IMAGE}${newImageFileName}.${imageOutExtension}`;
        image.convertedFilePath = imageOutFilePath;
        // Gets the command to execute the desired action
        const command = image.getCommand();
        const result = await execute.command(command, image.convertedFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });
    it('Should return the path of the converted file after a successful conversion', async () => {
        const newImageFile = 'test.jpg';
        const newImageFileName = 'test';
        const imageOutExtension = 'jpg';
        // Creates a new object image for image commands
        var image: ImageCommand = new ImageCommand();
        // Creates an object for executing the commands that were sent
        var execute: Execute = new Execute();
        // Adds the input file with its address to convert
        image.inputFile = `${process.env.UPLOADS_PATH_IMAGE}${newImageFile}`;
        // Adds the extension of the wanted output file
        image.outExtension = imageOutExtension;
        // Sets the dimensions of the output file
        image.width = 100;
        image.height = 100;
        // Sets the type of the output file
        image.typeOfOutput = 'grayscale';
        // Sets the degrees to rotate clock wisw CW
        image.rotateCW = 90;
        // Creates the output path according to design
        const imageOutFilePath: string = `${process.env.DOWNLOAD_PATH_IMAGE}${newImageFileName}.${imageOutExtension}`;
        image.convertedFilePath = imageOutFilePath;
        // Gets the command to execute the desired action
        const command = image.getCommand();
        const result = await execute.command(command, image.convertedFilePath);
        const outPath = './src/service/imageConverter/outputs/test.jpg';
        expect(result.outputPath).toBe(outPath);
    });
    it('Should execute the command without setting any parameter, just change the extension', async () => {
        const newImageFile = 'test.jpg';
        const newImageFileName = 'test2';
        const imageOutExtension = 'png';
        // Creates a new object image for image commands
        var image: ImageCommand = new ImageCommand();
        // Creates an object for executing the commands that were sent
        var execute: Execute = new Execute();
        // Adds the input file with its address to convert
        image.inputFile = `${process.env.UPLOADS_PATH_IMAGE}${newImageFile}`;
        // Adds the extension of the wanted output file
        image.outExtension = imageOutExtension;
        // Creates the output path according to design
        const imageOutFilePath: string = `${process.env.DOWNLOAD_PATH_IMAGE}${newImageFileName}.${imageOutExtension}`;
        image.convertedFilePath = imageOutFilePath;
        // Gets the command to execute the desired action
        const command = image.getCommand();
        const result = await execute.command(command, image.convertedFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });
});
