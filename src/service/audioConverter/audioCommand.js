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

    // Sets the duration attribute to be private
    #duration;

    // Sets the codec attribute to be private
    #codec;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Gets the inputFile attribute from the parent class
        super.inputFile;
        // Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        // Sets the bitRate attribute to a string with no value
        this.#bitRate = '';
        // Sets the duration attribute to a string with no value
        this.#duration = '';
        // Sets the codec attribute to a string with no value
        this.#codec = '';
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
    * Sets the duration of the output file
    * @param {integer} duration - This is the duration of the output file in seconds
    */
    set duration (duration) {
        if (duration === undefined) {
            this.#duration = '';
        } else {
            this.#duration = `-t ${duration}`;
        }
    }

    /**
    * Sets the newCodec of the output file
    * @param {integer} newCodec - This is the newCodec of the output file in seconds
    */
    set codec (newCodec) {
        if (newCodec === undefined) {
            this.#codec = '';
        } else {
            this.#codec = `-c:a ${newCodec}`;
        }
    }

    /**
    * Gets the audio command to run accordinng to the features added to the output file
    * @returns {string} The command to be executed by the child process.
    */
    getCommand () {
        const converter = process.env.FFMPEG;
        const command = `${converter} -i ${super.inputFile} -y ${this.#bitRate} ${this.#duration} ${super.convertedFilePath}`;
        return command;
    }
}
/*
Exports the AudioCommand class
*/
module.exports = {
    AudioCommand
};
