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
import { Command } from '../Command';

export class ImageCommand extends Command {
    // Sets the height attribute to be private
    private _width;

    // Sets the height attribute to be private
    private _height;

    // Sets the typeOfOutput attribute to be private
    private _typeOfOutput;

    // Sets the rotateCW attribute to be private
    private _rotateCW;

    constructor () {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Sets the typeOfOutput attribute to a string with no value
        this._typeOfOutput = '';
        // Sets the width attribute to a string with no value
        this._width = '';
        // Sets the height attribute to a string with no value
        this._height = '';
        // Sets the rotateCW attribute to a string with no value
        this._rotateCW = '';
    }

    /**
    * Sets the with of the new file to convert
    * @param {integer} width - This is the width that the new image will have
    */
    set width (width: number) {
        if (typeof width !== 'number') {
            this._width = '';
        } else {
            this._width = `-resize ${width}x`;
        }
    }

    /**
    * Sets the height of the new file to convert
    * @param {integer} Height - This is the height that the new image will have
    */
    set height (height: number) {
        if (typeof height !== 'number') {
            this._height = '';
        } else {
            this._height = `${height}`;
        }
    }

    /**
    * Sets the type of the new file to convert
    * @param {string} type This is the type that the new image will have
    */
    set typeOfOutput (type: string) {
        if (typeof type !== 'string') {
            this._typeOfOutput = '';
        } else {
            this._typeOfOutput = `-type ${type}`;
        }
    }

    /**
    * Sets the degrees to rotate clockwise of the new file to convert
    * @param {integer} degrees - This is the degrees to turn the new image clockwise
    */
    set rotateCW (degrees: number) {
        if (typeof degrees !== 'number') {
            this._rotateCW = '';
        } else {
            this._rotateCW = `-rotate ${degrees}`;
        }
    }

    /**
     * Gets the command to be executed by the child process
     * @returns {string} The command to convert the image.
     */
    getCommand () {
        const converter: string = String(process.env.MAGICK);
        const command: string = `${converter} ${this.inputFile} ${this._width}${this._height} ${this._typeOfOutput} ${this._rotateCW} ${this.convertedFilePath}`;
        return command;
    }
}