
const dotenv = require('dotenv');
const { AudioCommand } = require('./audioConverter/audioCommand.js');
const { Execute } = require('./Execute.js');
dotenv.config({path: __dirname + '/../../.env'});

const newAudioFile = 'DigitalLove.flac';
const audioOutExtension = 'flac';

//Creates a new object audio for audio commands
var audio = new AudioCommand();
//Creates an object for executing the commands that were sent
var execute = new Execute();
//Adds the input file with its address to convert
audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
//Adds the extension of the wanted output file
audio.outExtension = audioOutExtension;
//Adds command to convert the bit rate of the input file
audio.bitRate = '96k';
//Creates the output path according to design
const audioOutFilePath = `${process.env.DOWNLOAD_PATH_AUDIO}${audio.fileName(newAudioFile)}.${audioOutExtension}`;
//Sets the output path of the converted file
audio.convertedFilePath = audioOutFilePath;
//Gets the command to execute the desired action
var command = audio.getCommand();
console.log(command);
//Converts the input file and returns the state of the conversion
execute.command(command, audio.convertedFilePath);

