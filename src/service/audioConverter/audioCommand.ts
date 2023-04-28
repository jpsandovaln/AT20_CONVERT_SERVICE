/*
* @audioCommand.js Copyright(c) 2023 Jalasoft
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

export class AudioCommand extends Command {
    // Sets the bitRate attribute to be private
    private _bitRate: string;

    // Sets the duration attribute to be private
    private _duration: string;

    // // Sets the codec attribute to be private
    // private _codec: string;

    constructor() {
        // Gets the contructor of the parent class to use its attributes
        super();
        // Sets the bitRate attribute to a string with no value
        this._bitRate = '';
        // Sets the duration attribute to a string with no value
        this._duration = ' ';
        // Sets the codec attribute to a string with no value
        // this._codec = '';
    }

    /**
    * Sets the new bit rate of the output file
    * @param {integer} newBitRate - This is the bit rate of the output file
    */
    set bitRate (newBitRate: string) {
        if (newBitRate === undefined) {
            this._bitRate = '';
        } else {
            this._bitRate = `-b:a ${newBitRate}`;
        }
    }

    /**
    * Sets the duration of the output file
    * @param {integer} duration - This is the duration of the output file in seconds
    */
    set duration (duration: number) {
        if (typeof duration === 'undefined') {
            this._duration = '';
        } else {
            this._duration = `-t ${duration}`;
        }
    }

    // /**
    // * Sets the newCodec of the output file
    // * @param {integer} newCodec - This is the newCodec of the output file in seconds
    // */
    // set codec(newCodec: SVGAnimatedString) {
    //     if (newCodec === undefined) {
    //         this._codec = '';
    //     } else {
    //         this._codec = `-c:a ${newCodec}`;
    //     }
    // }

    /**
    * Gets the audio command to run accordinng to the features added to the output file
    * @returns {string} The command to be executed by the child process.
    */
    getCommand(): string {
        const converter: string = String(process.env.FFMPEG);
        var command: string = `${converter} -i ${this._inputFile} -y ${this._bitRate} ${this._duration} ${this._convertedFilePath}`;
        return command;
    }
}