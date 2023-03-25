/*
* @audioCommand.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { Command } = require('./../Command.js');

class AudioCommand extends Command {
    // Sets the bitRate attribute to be private
    #bitRate;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Gets the inputFile attribute from the parent class
        super.inputFile;
        // Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        // Sets the bitRate attribute to a string with no value
        this.#bitRate = '';
    }

    /**
    * Sets the new bit rate of the output file
    * @param {integer} newBitRate - This is the bit rate of the output file
    */
    set bitRate (newBitRate) {
        if (newBitRate === undefined) {
            this.#bitRate = '';
        } else {
            this.#bitRate = `-b:a ${newBitRate}`;
        }
    }

    /**
    * Gets the audio command to run accordinng to the features added to the output file
    * @returns {string} The command to be executed by the child process.
    */
    getCommand () {
        const converter = process.env.FFMPEG;
        const command = `${converter} -i ${super.inputFile} -y ${this.#bitRate} ${super.convertedFilePath}`;
        return command;
    }
}
/*
Exports the AudioCommand class
*/
module.exports = {
    AudioCommand
};
