/*
* @Command.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

class Command {
    // Sets the outExtension attribute to be private
    #outExtension;

    // Sets the convertedFilePath attribute to be private
    #convertedFilePath;

    // Sets the inputFile attribute to be private
    #inputFile;

    constructor () {
        // Sets the outExtension attribute a string with no value
        this.#outExtension = '';
        // Sets the convertedFilePath attribute a string with no value
        this.#convertedFilePath = '';
        // Sets the inputFile attribute a string with no value
        this.#inputFile = '';
    }

    /**
     * Returns the value of the private variable inputFile.
     * @returns {string} The inputFile property.
     */
    get inputFile () {
        return this.#inputFile;
    }

    /**
    * Sets the inputFile attribute
    * @param {string} newFile - This is the file to be converted, it should be the name with its extension
    */
    set inputFile (newFile) {
        this.#inputFile = newFile;
    }

    /**
    * Sets the outExtension attribute
    * @param {string} newOutExtension - This is the extension the new file will have
    */
    set outExtension (newOutExtension) {
        this.#outExtension = newOutExtension;
    }

    /**
    * Sets the convertedFilePath attribute
    * @param {string} newPath - This is the path the new file will have including the name and extension of the new file
    */
    set convertedFilePath (newPath) {
        this.#convertedFilePath = newPath;
    }

    /**
     * Returns the value of the private variable convertedFilePath.
     * @returns {string} The convertedFilePath property.
     */
    get convertedFilePath () {
        return this.#convertedFilePath;
    }

    /**
     * Throws an error if the function is not implemented.
     */
    getCommand () {
        throw new Error('Abstract class you must implement this method');
    }
}

/*
Exports the Command class
*/
module.exports = {
    Command
};
