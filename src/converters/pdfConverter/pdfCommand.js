const { Converter } = require('./../converter.js');

class pdfCommand extends Converter {
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
        this.#density = `-density ${densityValue}`;
    }

    set newQuality(qualityValue) {
        this.#quality = `-quality ${qualityValue}`;
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