/*
* @imageCommand.js Copyright(c) 2023 Jalasoft
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

class ImageCommand extends Command {
    // Sets the height attribute to be private
    #width;

    // Sets the height attribute to be private
    #height;

    // Sets the typeOfOutput attribute to be private
    #typeOfOutput;

    // Sets the rotateCW attribute to be private
    #rotateCW;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Gets the inputFile attribute from the parent class
        super.inputFile;
        // Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        // Sets the typeOfOutput attribute to a string with no value
        this.#typeOfOutput = '';
        // Sets the width attribute to a string with no value
        this.#width = '';
        // Sets the height attribute to a string with no value
        this.#height = '';
        // Sets the rotateCW attribute to a string with no value
        this.#rotateCW = '';
    }

    /**
    * Sets the with of the new file to convert
    * @param {integer} Width - This is the width that the new image will have
    */
    set newWidth (Width) {
        if (Width === undefined) {
            this.#width = '';
        } else {
            this.#width = `-resize ${Width}x`;
        }
    }

    /**
    * Sets the height of the new file to convert
    * @param {integer} Height - This is the height that the new image will have
    */
    set newHeight (Height) {
        if (Height === undefined) {
            this.#height = '';
        } else {
            this.#height = `${Height}`;
        }
    }

    /**
    * Sets the type of the new file to convert
    * @param {string} type This is the type that the new image will have
    */
    set typeOfOutput (type) {
        if (type === undefined) {
            this.#typeOfOutput = '';
        } else {
            this.#typeOfOutput = `-type ${type}`;
        }
    }

    /**
    * Sets the degrees to rotate clockwise of the new file to convert
    * @param {integer} degrees - This is the degrees to turn the new image clockwise
    */
    set rotateCW (degrees) {
        if (degrees === undefined) {
            this.#rotateCW = '';
        } else {
            this.#rotateCW = `-rotate ${degrees}`;
        }
    }

    /**
     * Gets the command to be executed by the child process
     * @returns {string} The command to convert the image.
     */
    getCommand () {
        const converter = process.env.MAGICK;
        const command = `${converter} ${super.inputFile} ${this.#width}${this.#height} ${this.#typeOfOutput} ${this.#rotateCW} ${super.convertedFilePath}`;
        return command;
    }
}

/*
Exports the ImageCommand class
*/
module.exports = {
    ImageCommand
};
