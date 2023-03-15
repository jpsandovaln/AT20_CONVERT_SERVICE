const { Command } = require('./../Command.js');

class AudioCommand extends Command {
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