/*
* @videoCommand.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const { Command } = require('../Command.js');

class VideoCommand extends Command {
    // Sets the width attribute to be private
    #width;

    // Sets the height attribute to be private
    #height;

    // Sets the aspectRatio attribute to be private
    #aspectRatio;

    // Sets the duration attribute to be private
    #duration;

    // Sets the framerate attribute to be private
    #framerate;

    // Sets the bitrate attribute to be private
    #bitrate;

    // Sets the autoCodec attribute to be private
    #autoCodec;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Gets the inputFile attribute from the parent class
        super.inputFile;
        // Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        // Sets the width attribute to a string with no value
        this.#width = '';
        // Sets the height attribute to a string with no value
        this.#height = '';
        // Sets the aspectRatio attribute to a string with no value
        this.#aspectRatio = '';
        // Sets the duration attribute to a string with no value
        this.#duration = '';
        // Sets the framerate attribute to a string with no value
        this.#framerate = '';
        // Sets the bitrate attribute to a string with no value
        this.#bitrate = '';
        // Sets the autoCodec attribute to a string with no value
        this.#autoCodec = '';
    }

    /**
    * Sets the new width of the output file
    * @param {integer} Width - This is the width of the output file
    */
    set newWidth (Width) {
        if (Width === undefined) {
            this.#width = '';
        } else {
            this.#width = `-s ${Width}x`;
        }
    }

    /**
    * Sets the new heigth of the output file
    * @param {integer} Heigth - This is the heigth of the output file
    */
    set newHeight (Height) {
        if (Height === undefined) {
            this.#height = '';
        } else {
            this.#height = `${Height}`;
        }
    }

    /**
    * Sets the aspectRatio of the output file
    * @param {string} ratio This is the new ratio of the output file
    */
    set aspectRatio (ratio) {
        if (ratio === undefined) {
            this.#aspectRatio = '';
        } else {
            this.#aspectRatio = `-aspect ${ratio}`;
        }
    }

    /**
     * Sets the duration of the input video to be converted
     * @param {integer} duration - The duration of the input video to be converted
     */
    set duration (duration) {
        if (duration === undefined) {
            this.#duration = '';
        } else {
            this.#duration = `-t ${duration}`;
        }
    }

    /**
    * Sets the framerate of the output file
    * @param {string} framerate This is the new framerate of the output file
    */
    set framerate (framerate) {
        if (framerate === undefined) {
            this.#framerate = '';
        } else {
            this.#framerate = `-r ${framerate}`;
        }
    }

    /**
    * Sets the bitrate of the output file
    * @param {string} bitrate This is the new bitrate of the output file
    */
    set bitrate (bitrate) {
        if (bitrate === undefined) {
            this.#bitrate = '';
        } else {
            this.#bitrate = `-b:v ${bitrate}`;
        }
    }

    /**
    * Sets the autoCodec of the output file
    * @param {string} autoCodec This is the new autoCodec of the output file
    */
    set autoCodec (autoCodec) {
        if (autoCodec === undefined) {
            this.#autoCodec = '';
        } else {
            this.#autoCodec = `-c:v ${autoCodec}`;
        }
    }

    /**
     * Gets the path to the ffmpeg executable, then creates a command string that will be
     * used to convert the video file
     * @returns {string} - The command to be executed by the child process.
     */
    getCommand () {
        const converter = process.env.FFMPEG;
        const command = `${converter} -i ${super.inputFile} ${this.#width}${this.#height} ${this.#aspectRatio} ${this.#duration} ${this.#framerate} ${this.#bitrate} ${this.#autoCodec} ${super.convertedFilePath}`;
        return command;
    }
}
/*
Exports the VideoCommand class
*/
module.exports = {
    VideoCommand
};
