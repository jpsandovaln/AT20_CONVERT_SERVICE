/*
* @audioConvert.js Copyright(c) 2023 Jalasoft
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
const { AudioCommand } = require('../audioConverter/audioCommand.js');
const { Execute } = require('../Execute.js');
dotenv.config({ path: __dirname + './../../../.env' });

const newAudioFile = 'DigitalLove.flac';
const newAudioFileName = 'DigitalLove';
const audioOutExtension = 'flac';

// Creates a new object audio for audio commands
const audio = new AudioCommand();
// Creates an object for executing the commands that were sent
const execute = new Execute();
// Adds the input file with its address to convert
audio.inputFile = `${'../audioConverter/inputs/'}${newAudioFile}`;
// Adds the extension of the wanted output file
audio.outExtension = audioOutExtension;
// Adds command to convert the bit rate of the input file
audio.bitRate = '96k';
// set duration to 60 seconds
audio.duration = 60;
// set the audio codec to MP3
audio.codec = 'libmp3lame';
// Creates the output path according to design
const audioOutFilePath = `${'../audioConverter/outputs/'}${newAudioFileName}.${audioOutExtension}`;
// Sets the output path of the converted file
audio.convertedFilePath = audioOutFilePath;
// Gets the command to execute the desired action
const command = audio.getCommand();
console.log(command);
// Converts the input file and returns the state of the conversion
execute.command(command, audio.convertedFilePath);
