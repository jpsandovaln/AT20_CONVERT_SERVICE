const { Command } = require('./../Command.js');

class pdfCommand extends Command {
    #density;

    #quality;

    constructor() {
        super();
        //this.#bitRate='';
        super.inputFile;
        super.convertedFilePath;
        this.#density = '';
        this.#quality = '';
    }


    set newDensity(densityValue) {
        if (densityValue === undefined) {
            this.#density = '';
        } else {
            this.#density = `-density ${densityValue}`;
        }
    }

    set newQuality(qualityValue) {
        if (qualityValue === undefined) {
            this.#quality = '';
        } else {
            this.#quality = `-quality ${qualityValue}`;
        }
    }

    getCommand() {
        const converter = process.env.MAGICK;
        var command = `${converter} ${this.#density} ${super.inputFile} ${this.#quality} ${super.convertedFilePath}`;
        return command;
    }
}

module.exports = {
    pdfCommand,
};