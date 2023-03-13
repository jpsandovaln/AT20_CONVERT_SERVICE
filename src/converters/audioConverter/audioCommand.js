const { Converter } = require('./../converter.js');

class AudioCommand extends Converter {
    #bitRate;

    constructor() {
        super();
        super.inputFile;
        super.convertedFilePath;
        this.#bitRate = '';
    }

    set bitRate (newBitRate) {
        this.#bitRate = `-b:a ${newBitRate}`;
    }


    getCommand() {
        const converter = process.env.FFMPEG;
        var command = `${converter} -i ${super.inputFile} -y ${this.#bitRate} ${super.convertedFilePath}`;
        return command;
    }
}
module.exports = {
    AudioCommand,
};