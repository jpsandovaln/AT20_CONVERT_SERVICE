const { Command } = require('../Command.js');

class VideoCommand extends Command {
    #width;

    #height;

    #aspectRatio;

    constructor() {
        super();
        super.inputFile;
        super.convertedFilePath;
        this.#width = '';
        this.#height = '';
        this.#aspectRatio = '';
    }

    set newWidth(Width) {
        if (Width === undefined) {
            this.#width = '';
        } else {
            this.#width = `-s ${Width}x`;
        }
    }

    set newHeight(Height) {
        if (Height === undefined) {
            this.#height = '';
        } else {
            this.#height = `${Height}`;
        }
    }

    set aspectRatio(ratio) {
        if (ratio === undefined) {
            this.#aspectRatio = '';
        } else {
            this.#aspectRatio = `-aspect ${ratio}`;
        }
    }

    getCommand() {
        const converter = process.env.FFMPEG;
        var command = `${converter} -i ${super.inputFile} ${this.#width}${this.#height} ${this.#aspectRatio} ${super.convertedFilePath}`;
        return command;
    }
}
module.exports = {
    VideoCommand,
};