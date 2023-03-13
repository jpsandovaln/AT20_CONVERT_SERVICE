const { Converter } = require('./../converter.js');

class VideoCommand extends Converter {
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
        this.#width = `-s ${Width}x`;
    }

    set newHeight(Height) {
        this.#height = `${Height}`;
    }

    set aspectRatio(ratio) {//can be only aspect
        this.#aspectRatio = `-aspect ${ratio}`;
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