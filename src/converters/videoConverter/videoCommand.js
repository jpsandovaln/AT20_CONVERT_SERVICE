/*
@videoCommand.js Copyright(c) 2021 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

//Imports the parent Command class
const { Command } = require('../Command.js');

class VideoCommand extends Command {
    //Sets the width attribute to be private
    #width;

    //Sets the height attribute to be private
    #height;

    //Sets the aspectRatio attribute to be private
    #aspectRatio;

    constructor() {
        //Gets the contructor of the parent class to use its attributes
        super();
        //Gets the inputFile attribute from the parent class
        super.inputFile;
        //Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        //Sets the width attribute to a string with no value
        this.#width = '';
        //Sets the height attribute to a string with no value
        this.#height = '';
        //Sets the aspectRatio attribute to a string with no value
        this.#aspectRatio = '';
    }

    /*
    Method to set the new width of the output file
    */
    /**
    * @param {integer} Width - This is the width of the output file
    */
    set newWidth(Width) {
        if (Width === undefined) {
            this.#width = '';
        } else {
            this.#width = `-s ${Width}x`;
        }
    }

    /*
    Method to set the new heigth of the output file
    */
    /**
    * @param {integer} Heigth - This is the heigth of the output file
    */
    set newHeight(Height) {
        if (Height === undefined) {
            this.#height = '';
        } else {
            this.#height = `${Height}`;
        }
    }

    /*
    Method to set the aspectRatio of the output file
    */
    /**
    * @param {string} ratio This is the new ratio of the output file
    */
    set aspectRatio(ratio) {
        if (ratio === undefined) {
            this.#aspectRatio = '';
        } else {
            this.#aspectRatio = `-aspect ${ratio}`;
        }
    }

    /**
     * The function gets the path to the ffmpeg executable, then creates a command string that will be
     * used to convert the video file
     * @returns The command to be executed by the child process.
     */
    getCommand() {
        const converter = process.env.FFMPEG;
        var command = `${converter} -i ${super.inputFile} ${this.#width}${this.#height} ${this.#aspectRatio} ${super.convertedFilePath}`;
        return command;
    }
}
/*
Exports the VideoCommand class
*/
module.exports = {
    VideoCommand,
};