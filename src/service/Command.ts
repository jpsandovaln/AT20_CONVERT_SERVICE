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

export abstract class Command {
    /**
     * The file extension for the output of the command.
     * @protected {string}
     */
    protected _outExtension: string;

    /**
     * The path to the converted output file.
     * @protected {string}
     */
    protected _convertedFilePath: string;

    /**
     * The path to the input file.
     * @protected {string}
     */
    protected _inputFile: string;

    constructor() {
        //Sets the outExtension attribute a string with no value
        this._outExtension = '';
        //Sets the convertedFilePath attribute a string with no value
        this._convertedFilePath = '';
        //Sets the inputFile attribute a string with no value
        this._inputFile = '';
    }

    /**
     * Returns the value of the private variable inputFile.
     * @returns {string} The inputFile property.
     */
    get inputFile(): string {
        return this._inputFile;
    }

    /**
    * Sets the inputFile attribute
    * @param {string} newFile - This is the file to be converted, it should be the name with its extension
    */
    set inputFile (newFile: string) {
        this._inputFile = newFile;
    }

    /**
    * Sets the outExtension attribute
    * @param {string} newOutExtension - This is the extension the new file will have
    */
    set outExtension(newOutExtension: string) {
        this._outExtension = newOutExtension;
    }

    /**
    * Sets the convertedFilePath attribute
    * @param {string} newPath - This is the path the new file will have including the name and extension of the new file
    */
    set convertedFilePath(newPath: string) {
        this._convertedFilePath = newPath;
    }

    /**
     * Returns the value of the private variable convertedFilePath.
     * @returns {string} The convertedFilePath property.
     */
    get convertedFilePath (): string {
        return this._convertedFilePath;
    }

    /**
     * Returns the command string to execute
     */
    abstract getCommand(): string;
}
