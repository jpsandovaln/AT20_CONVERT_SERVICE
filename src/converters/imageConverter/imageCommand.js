const { Converter } = require('./../converter.js');

class ImageCommand extends Converter {
    #width;

    #height;

    #typeOfOutput;

    #rotateCW;

    constructor() {
        super();
        //this.#bitRate='';
        super.inputFile;
        super.convertedFilePath;
        this.#typeOfOutput = '';
        this.#width = '';
        this.#height = '';
        this.#rotateCW = '';
    }


    set newWidth(Width) {
        this.#width = `-resize ${Width}x`;
    }

    set newHeight(Height) {
        this.#height = `${Height}`;
    }

    set typeOfOutput(type) {
        this.#typeOfOutput = `-type ${type}`;
    }

    set rotateCW(degrees) {
        this.#rotateCW = `-rotate ${degrees}`;
    }


    getCommand() {
        const converter = process.env.MAGICK;
        var command = `${converter} ${super.inputFile} ${this.#width}${this.#height} ${this.#typeOfOutput} ${this.#rotateCW} ${super.convertedFilePath}`;
        return command;
    }
}

module.exports = {
    ImageCommand,
};