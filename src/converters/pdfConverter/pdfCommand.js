/**
* @pdfCommand.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
**/

// Importing the Command class from the Command.js file. */
const { Command } = require('./../Command.js');

class pdfCommand extends Command {
    //Sets the density attribute to be private
    #density;

    //Sets the quality attribute to be private
    #quality;

    //Sets the pages attribute to be private
    #pages;

    /**
     * The constructor function is used to initialize the object's properties.
     **/
    constructor() {
        super();
        super.inputFile;
        super.convertedFilePath;
        this.#density = '';
        this.#quality = '';
        this.#pages = '';
    }


    /**
     * Sets a density value as an argument and sets the density property of the class to
     * the value of the argument
     * @param densityValue - The density value to set.
     **/
    set newDensity(densityValue) {
        if (densityValue === undefined) {
            this.#density = '';
        } else {
            this.#density = `-density ${densityValue}`;
        }
    }

    /**
     * Sets a quality value and sets the quality variable to the quality value.
     * @param qualityValue - The quality value you want to set.
     **/
    set newQuality(qualityValue) {
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
    **/
    newPageRange(rangeLow, rangeHigh) {
        if (rangeLow == rangeHigh) {
            this.#pages = `[${rangeHigh}]`;
        } else {
            this.#pages = `[${rangeLow}-${rangeHigh}]`;
        }
    }

    /**
     * "The function gets the command to convert the file from the super class and then adds the
     * density and quality to the command."
     * </code>
     * @returns The command to be executed.
     **/
    getCommand() {
        const converter = process.env.MAGICK;
        var command = `${converter} ${this.#density} ${super.inputFile}${this.#pages} ${this.#quality} ${super.convertedFilePath}`;
        return command;
    }
}

// Exporting the pdfCommand class to be used in other files.
module.exports = {
    pdfCommand,
};