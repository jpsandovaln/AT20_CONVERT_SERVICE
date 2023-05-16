/*
* @pdfCommand.js Copyright(c) 2023 Jalasoft
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

class pdfCommand extends Command {
    // Sets the density attribute to be private
    #density;

    // Sets the quality attribute to be private
    #quality;

    // Sets the pages attribute to be private
    #pages;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Gets the inputFile attribute from the parent class
        super.inputFile;
        // Gets the convertedFilePath attribute from the parent class
        super.convertedFilePath;
        // Sets the density attribute to a string with no value
        this.#density = '';
        // Sets the quality attribute to a string with no value
        this.#quality = '';
        // Sets the pages attribute to a string with no value
        this.#pages = '';
    }

    /**
     * Sets a density of the output file
     * @param densityValue Density - This is the value that represents the DPI of output images.
     */
    set newDensity (densityValue) {
        if (densityValue === undefined) {
            this.#density = '';
        } else {
            this.#density = `-density ${densityValue}`;
        }
    }

    /**
     * Sets a quality of the output file
     * @param qualityValue Quality - This is the value that specify the quality for the generated images.
     */
    set newQuality (qualityValue) {
        if (qualityValue === undefined) {
            this.#quality = '';
        } else {
            this.#quality = `-quality ${qualityValue}`;
        }
    }

    /**
    * If the rangeLow and rangeHigh are the same, then the pages property is set to a string with the
    * rangeHigh in brackets. Otherwise, the pages property is set to a string with the rangeLow and
    * rangeHigh in brackets.
    * @param rangeLow - The lowest page number in the range.
    * @param rangeHigh - The highest page number in the range.
    */
    newPageRange (rangeLow, rangeHigh) {
        if (rangeLow == rangeHigh) {
            this.#pages = `[${rangeHigh}]`;
        } else {
            this.#pages = `[${rangeLow}-${rangeHigh}]`;
        }
    }

    /**
     * Gets the command to be executed by the child process.
     * @returns {string} The command to be executed.
     */
    getCommand () {
        const converter = process.env.MAGICK;
        const command = `${converter} ${this.#density} ${super.inputFile}${this.#pages} ${this.#quality} ${super.convertedFilePath}`;
        return command;
    }
}

/*
Exports the pdfCommand class
*/
module.exports = {
    pdfCommand
};
