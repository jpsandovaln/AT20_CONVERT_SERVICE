/*
* @videoCommand.js Copyright(c) 2023 Jalasoft
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
// const Command  = require('../Command.ts');

export class VideoCommand extends Command {
    //Sets the width attribute to be private
    private _width: string;

    //Sets the height attribute to be private
    private _height: string;

    //Sets the aspectRatio attribute to be private
    private _aspectRatio: string;

    //Sets the duration attribute to be private
    private _duration: string;

    //Sets the framerate attribute to be private
    private _framerate: string;

    //Sets the bitrate attribute to be private
    private _bitrate: string;

    //Sets the autoCodec attribute to be private
    private _autoCodec: string;

    constructor() {
        super();
        // Inicialize the attributes with empty strings
        this._width = '';
        this._height = '';
        this._aspectRatio = '';
        this._duration = '';
        this._framerate = '';
        this._bitrate = '';
        this._autoCodec = '';
    }

    /**
    * Sets the new width of the output file
    * @param {integer} Width - This is the width of the output file
    */
    set width(Width: number) {
        if (Width === undefined) {
            this._width = '';
        } else {
            this._width = `-s ${Width}x`;
        }
    }

    /**
    * Sets the new heigth of the output file
    * @param {integer} Heigth - This is the heigth of the output file
    */
    set height(Height: number) {
        if (Height === undefined) {
            this._height = '';
        } else {
            this._height = `${Height}`;
        }
    }

    /**
    * Sets the aspectRatio of the output file
    * @param {string} ratio This is the new ratio of the output file
    */
    set aspectRatio(ratio: string) {
        if (ratio === undefined) {
            this._aspectRatio = '';
        } else {
            this._aspectRatio = `-aspect ${ratio}`;
        }
    }

    /**
     * Sets the duration of the input video to be converted
     * @param {integer} duration - The duration of the input video to be converted
     */
    set duration(duration: number) {
        if (duration === undefined) {
            this._duration = '';
        } else {
            this._duration = `-t ${duration}`;
        }
    }

    /**
    * Sets the framerate of the output file
    * @param {string} framerate This is the new framerate of the output file
    */
    set framerate(framerate: number) {
        if (framerate === undefined) {
            this._framerate = '';
        } else {
            this._framerate = `-r ${framerate}`;
        }
    }

    /**
    * Sets the bitrate of the output file
    * @param {string} bitrate This is the new bitrate of the output file
    */
    set bitrate(bitrate: string) {
        if (bitrate === undefined) {
            this._bitrate = '';
        } else {
            this._bitrate = `-b:v ${bitrate}`;
        }
    }

    /**
    * Sets the autoCodec of the output file
    * @param {string} autoCodec This is the new autoCodec of the output file
    */
    set autoCodec(autoCodec: string) {
        if (autoCodec === undefined) {
            this._autoCodec = '';
        } else {
            this._autoCodec = `-c:v ${autoCodec}`;
        }
    }


    /**
     * Gets the path to the ffmpeg executable, then creates a command string that will be
     * used to convert the video file
     * @returns {string} - The command to be executed by the child process.
     */
    getCommand(): string {
        const converter: string = String(process.env.FFMPEG);
        const command: string = `${converter} -i ${this.inputFile} ${this._width}${this._height} ${this._aspectRatio} ${this._duration} ${this._framerate} ${this._bitrate} ${this._autoCodec} ${this.convertedFilePath}`;
        return command;
    }
}