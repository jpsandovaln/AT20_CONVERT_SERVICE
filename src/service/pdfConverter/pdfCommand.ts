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

import { Command } from '../Command';

export class pdfCommand extends Command {
    //Sets the density attribute to be private
    private _density: string;

    //Sets the quality attribute to be private
    private _quality: string;

    //Sets the pages attribute to be private
    private _pages: string;

    constructor() {
        //Gets the contructor of the parent class to use its attributes
        super();
        //Sets the density attribute to a string with no value
        this._density = '';
        //Sets the quality attribute to a string with no value
        this._quality = '';
        //Sets the pages attribute to a string with no value
        this._pages = '';
    }


    /**
     * Sets a density of the output file
     * @param densityValue Density - This is the value that represents the DPI of output images.
     */
    set density(densityValue: number) {
        if (densityValue === undefined) {
            this._density = '';
        } else {
            this._density = `-density ${densityValue}`;
        }
    }

    /**
     * Sets a quality of the output file
     * @param qualityValue Quality - This is the value that specify the quality for the generated images.
     */
    set quality(qualityValue: number) {
        if (qualityValue === undefined) {
            this._quality = '';
        } else {
            this._quality = `-quality ${qualityValue}`;
        }
    }

    /**
    * If the rangeLow and rangeHigh are the same, then the pages property is set to a string with the
    * rangeHigh in brackets. Otherwise, the pages property is set to a string with the rangeLow and
    * rangeHigh in brackets.
    * @param rangeLow - The lowest page number in the range.
    * @param rangeHigh - The highest page number in the range.
    */
    newPageRange(rangeLow: number, rangeHigh: number): void {
        if (rangeLow == rangeHigh) {
            this._pages = `[${rangeHigh}]`;
        } else {
            this._pages = `[${rangeLow}-${rangeHigh}]`;
        }
    }

    /**
     * Gets the command to be executed by the child process.
     * @returns {string} The command to be executed.
     */
    getCommand(): string {
        const converter:string = String(process.env.MAGICK);
        var command: string = `${converter} ${this._density} ${this.inputFile}${this._pages} ${this._quality} ${this.convertedFilePath}`;
        return command;
    }
}