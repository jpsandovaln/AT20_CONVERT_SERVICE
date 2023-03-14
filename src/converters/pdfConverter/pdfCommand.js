const { Command } = require('./../Command.js');

class pdfCommand extends Command {
    #density;

    #quality;

    /**
     * The constructor function is used to initialize the object's properties.
     */
    constructor() {
        super();
        //this.#bitRate='';
        super.inputFile;
        super.convertedFilePath;
        this.#density = '';
        this.#quality = '';
    }


    /**
     * The function takes a density value as an argument and sets the density property of the class to
     * the value of the argument
     * @param densityValue - The density value to set.
     */
    set newDensity(densityValue) {
        this.#density = `-density ${densityValue}`;
    }

    /**
     * The function takes a quality value and sets the quality variable to the quality value.
     * @param qualityValue - The quality value you want to set.
     */
    set newQuality(qualityValue) {
        this.#quality = `-quality ${qualityValue}`;
    }

    /**
     * "The function gets the command to convert the file from the super class and then adds the
     * density and quality to the command."
     * </code>
     * @returns The command to be executed.
     */
    getCommand() {
        const converter = process.env.MAGICK;
        var command = `${converter} ${this.#density} ${super.inputFile} ${this.#quality} ${super.convertedFilePath}`;
        return command;
    }
}

/* Exporting the pdfCommand class to be used in other files. */
module.exports = {
    pdfCommand,
};