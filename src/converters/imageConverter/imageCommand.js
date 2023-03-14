/**
@imageCommand.jsCopyright(c)2021Jalasoft
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

class ImageCommand extends Command {
    //Sets the height attribute to be private
    #width;

    //Sets the height attribute to be private
    #height;

    //Sets the typeOfOutput attribute to be private
    #typeOfOutput;

    //Sets the rotateCW attribute to be private
    #rotateCW;

    constructor() {
        //Gets the contructor of the parent class to use its attributes
        super();
        //Gets the inputFile attribute from the parent class
        super.inputFile;
        //Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        //Sets the typeOfOutput attribute to a string with no value
        this.#typeOfOutput = '';
        //Sets the width attribute to a string with no value
        this.#width = '';
        //Sets the height attribute to a string with no value
        this.#height = '';
        //Sets the rotateCW attribute to a string with no value
        this.#rotateCW = '';
    }

    /**
    * Method to set the with of the new file to convert
    * @param {integer} Width - This is the width that the new image will have
    */
    set newWidth(Width) {
        this.#width = `-resize ${Width}x`;
    }

    /**
    * Method to set the height of the new file to convert
    * @param {integer} Height - This is the height that the new image will have
    */
    set newHeight(Height) {
        this.#height = `${Height}`;
    }

    /**
    * Method to set the type of the new file to convert
    * @param {string} type This is the type that the new image will have
    */
    set typeOfOutput(type) {
        this.#typeOfOutput = `-type ${type}`;
    }

    /**
    * Method to set the degrees to rotate clockwise of the new file to convert
    * @param {integer} degrees - This is the degrees to turn the new image clockwise
    */
    set rotateCW(degrees) {
        this.#rotateCW = `-rotate ${degrees}`;
    }

    /**
     * The function gets the command to be executed by the child process
     * @returns The command to convert the image.
     */
    getCommand() {
        const converter = process.env.MAGICK;
        var command = `${converter} ${super.inputFile} ${this.#width}${this.#height} ${this.#typeOfOutput} ${this.#rotateCW} ${super.convertedFilePath}`;
        return command;
    }
}

/*
Exports the ImageCommand class
*/
module.exports = {
    ImageCommand,
};