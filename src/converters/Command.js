/*
@Command.js Copyright(c) 2023 Jalasoft
2643AvMelchorPerezdeOlguin,ColquiriSud,Cochabamba,Bolivia.
Av.GeneralInofuentesesquinaCalle20,EdificioUnionNo1376,LaPaz,Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

class Command {
    //Sets the outExtension attribute to be private
    #outExtension;

    //Sets the convertedFilePath attribute to be private
    #convertedFilePath;

    //Sets the inputFile attribute to be private
    #inputFile;

    constructor() {
        //Sets the outExtension attribute a string with no value
        this.#outExtension = '';
        //Sets the convertedFilePath attribute a string with no value
        this.#convertedFilePath = '';
        //Sets the inputFile attribute a string with no value
        this.#inputFile = '';
    }

    /**
     * It returns the value of the private variable inputFile.
     * @returns The inputFile property.
     */
    get inputFile() {
        return this.#inputFile;
    }

    /**
    * Method to set the inputFile attribute
    * @param {string} newFile - This is the file to be converted, it should be the name with its extension
    */
    set inputFile (newFile) {
        this.#inputFile = newFile;
    }

    /**
    * Method to set the outExtension attribute
    *@param {string} newOutExtension - This is the extension the new file will have
    */
    set outExtension(newOutExtension) {
        this.#outExtension = newOutExtension;
    }

    /**
    * Method to set the convertedFilePath attribute
    * @param {string} newPath - This is the path the new file will have including the name and extension of the new file
    */
    set convertedFilePath(newPath) {
        this.#convertedFilePath = newPath;
    }

    /**
     * It returns the value of the private variable convertedFilePath.
     * @returns The convertedFilePath property.
     */
    get convertedFilePath () {
        return this.#convertedFilePath;
    }

    /**
    * Method to get the file name of the file to be converted
    * @param {string} newFile - This method returns the name of the file to be converted
    * @returns The file name of the file that is being passed in.
    */
    fileName(newFile) {
        var fileName = newFile.substring(0, newFile.indexOf('.'));
        return fileName;
    }
    /**
    * Method to get the input file extension of the file to be converted
    * @param {string} newFile - This method returns the extension of the file to be converted
    * @return The input extension
    */

    inputFileExtension(newFile) {
        var inputExtension = newFile.slice(newFile.indexOf('.') + 1, newFile.length);
        return inputExtension;
    }

    /**
     * It throws an error if the function is not implemented.
     */
    getCommand() {
        throw new Error('Abstract class you must implement this method');
    }
}

/*
Exports the Command class
*/
module.exports = {
    Command,
};
