/*
* @videoCommand.test.js Copyright(c) 2023 Jalasoft
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
import { VideoCommand } from '../../../src/service/videoConverter/videoCommand';
import { Execute } from '../../../src/service/Execute';

dotenv.config({ path: __dirname + '../../../../.env' });

describe('This is the test suite for the pdf convert service', () => {
    it('Should return the command to be executed according to the requirements previously inserted', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the dimensions of the output file
        video.width = 420;
        video.height = 240;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '4:3';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '1000k';
        // Set autoCodec property
        video.autoCodec = 'libx264';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 -s 420x240 -aspect 4:3 -t 60 -r 30 -b:v 1000k -c:v libx264 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
    it('Should execute the command and return a message for a successful convertion', async () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'avi';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the dimensions of the output file
        video.width = 420;
        video.height = 240;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '4:3';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '1000k';
        // Set autoCodec property
        video.autoCodec = 'libx264';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const result = await execute.command(command, video.convertedFilePath);
        const outState = 'Conversion Completed';
        expect(result.stdout).toStrictEqual(outState);
    });
    it('Should return the path of the converted file after a successful conversion', async () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mov';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the dimensions of the output file
        video.width = 420;
        video.height = 240;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '4:3';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '1000k';
        // Set autoCodec property
        video.autoCodec = 'libx264';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const result = await execute.command(command, video.convertedFilePath);
        const outPath = './src/service/videoConverter/outputs/maxwell.mov';
        expect(result.outputPath).toStrictEqual(outPath);
    });
    it('Should execute the command without setting any parameter, just change the extension', async () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell2';
        const videoOutExtension: string = 'avi';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const result = await execute.command(command, video.convertedFilePath);
        const outState = 'Conversion Completed';
        expect(result.stdout).toStrictEqual(outState);
    });
    it('Should return a valid command to execute, managing a zero value settled in width and height', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the dimensions of the output file
        video.width = 0;
        video.height = 0;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '4:3';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '1000k';
        // Set autoCodec property
        video.autoCodec = 'libx264';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 -aspect 4:3 -t 60 -r 30 -b:v 1000k -c:v libx264 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
    it('Should return a valid command to execute, managing negative values settled in width and height', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the dimensions of the output file
        video.width = -420;
        video.height = -240;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '4:3';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '1000k';
        // Set autoCodec property
        video.autoCodec = 'libx264';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 -aspect 4:3 -t 60 -r 30 -b:v 1000k -c:v libx264 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
    it('Should return a valid command to execute, managing empty values settled in aspectRatio, bitrate and autoCodec', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Sets the aspect ratio of the output file
        video.aspectRatio = '';
        // Set duration of 60 seconds
        video.duration = 60;
        // Set framerate property
        video.framerate = 30;
        // Set bitrate property
        video.bitrate = '';
        // Set autoCodec property
        video.autoCodec = '';
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 -t 60 -r 30 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
    it('Should return a valid command to execute, managing zero values settled in duration and framerate', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Set duration of 60 seconds
        video.duration = 0;
        // Set framerate property
        video.framerate = 0;
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
    it('Should return a valid command to execute, managing negative values settled in duration and framerate', () => {
        const newVideoFile: string = 'maxwell.mp4';
        const newVideoFileName: string = 'maxwell';
        const videoOutExtension: string = 'mp4';
        // Creates a new object video for video commands
        const video = new VideoCommand();
        // Adds the input file with its address to convert
        video.inputFile = `${process.env.UPLOADS_PATH_VIDEO}${newVideoFile}`;
        // Adds the extension of the wanted output file
        video.outExtension = videoOutExtension;
        // Set duration of 60 seconds
        video.duration = -60;
        // Set framerate property
        video.framerate = -30;
        // Creates the output path according to design
        const videoOutFilePath = `${process.env.DOWNLOAD_PATH_VIDEO}${newVideoFileName}.${videoOutExtension}`;
        // Sets the output path of the converted file
        video.convertedFilePath = videoOutFilePath;
        // Gets the command to execute the desired action
        const command = video.getCommand();
        const expectedCommand = 'ffmpeg -i ./src/service/videoConverter/inputs/maxwell.mp4 ./src/service/videoConverter/outputs/maxwell.mp4';
        expect(command).toBe(expectedCommand);
    });
});
