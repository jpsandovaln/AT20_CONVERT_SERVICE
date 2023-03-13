const { exec } = require('child_process');
class Converter {
    #outExtension;

    #convertedFilePath;

    #inputFile;

    constructor() {
        this.#outExtension = '';
        this.#convertedFilePath = '';
        this.#inputFile = '';
    }

    get inputFile() {
        return this.#inputFile;
    }

    set inputFile (newFile) {
        this.#inputFile = newFile;
    }

    set outExtension(newOutExtension) {
        this.#outExtension = newOutExtension;
    }

    set convertedFilePath(newpath) {
        this.#convertedFilePath = newpath;
    }

    get convertedFilePath () {
        return this.#convertedFilePath;
    }

    fileName(newFile) {
        var fileName = newFile.substring(0, newFile.indexOf('.'));
        return fileName;
    }

    inputFileExtension(newFile) {
        var inputExtension = newFile.slice(newFile.indexOf('.') + 1, newFile.length);
        return inputExtension;
    }

    convert(command, outFilePath) {
        var result = new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(console.log('An error occurred: ' + stderr));
                } else {
                    console.log('conversion completed');
                    resolve(outFilePath);
                }
            });
        });
        return result;
    }
}

module.exports = {
    Converter,
};
