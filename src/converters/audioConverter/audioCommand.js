/**
@audioCommand.jsCopyright(c)2021Jalasoft
2643AvMelchorPerezdeOlguin,ColquiriSud,Cochabamba,Bolivia.
Av.GeneralInofuentesesquinaCalle20,EdificioUnionNo1376,LaPaz,Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/


//Imports the parent Command class
const { Command } = require('./../Command.js');

class AudioCommand extends Command {
    //Sets the bitRate attribute to be private
    #bitRate;

    constructor() {
        //Gets the contructor of the parent class to use its attributes
        super();
        //Gets the inputFile attribute from the parent class
        super.inputFile;
        //Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        //Sets the bitRate attribute to a string with no value
        this.#bitRate = '';
    }

    /*
    Method to set the new bit rate of the output file
    */
    /**
    * @param {integer} newBitRate - This is the bit rate of the output file
    */
    set bitRate (newBitRate) {
        this.#bitRate = `-b:a ${newBitRate}`;
    }

    /**
    Method to get the audio command to run accordinng to the features added to the output file
    */
    /**
    * @returns The command to be executed by the child process.
    */
    getCommand() {
        const converter = process.env.FFMPEG;
        var command = `${converter} -i ${super.inputFile} -y ${this.#bitRate} ${super.convertedFilePath}`;
        return command;
    }
}
/*
Exports the AudioCommand class
*/
module.exports = {
    AudioCommand,
};