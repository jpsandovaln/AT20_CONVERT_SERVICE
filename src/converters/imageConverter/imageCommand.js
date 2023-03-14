const { Command } = require('./../Command.js');

class ImageCommand extends Command {
    #width;

    #height;

    #typeOfOutput;

    #rotateCW;

    constructor() {
        super();
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