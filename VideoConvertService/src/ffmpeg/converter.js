const { exec } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

export class Converter {
    constructor () {}

    runConverter (inputVideo, outputVideo) {
        const outputPath = process.env.OUTPUT_PATH + Date.now() + '.' + outputVideo;
        const command = `${process.env.FFMPEG} -i ${inputVideo} ${outputPath}`;
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message);
                }if (stderr) {
                    console.log(stderr);
                    reject(stderr);
                }
                console.log(stdout);
                resolve('Ok!');
            });
        });
    }

    runConverterWithDimensions (inputVideo, outputVideo, widthVideo, heightVideo) {
        const outputPath = process.env.OUTPUT_PATH + Date.now() + '.' + outputVideo;
        const dimensions = widthVideo + 'x' + heightVideo;
        const command = `${process.env.FFMPEG} -i ${inputVideo} -s ${dimensions} ${outputPath}`;
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message);
                }
                if (stderr) {
                    console.log(stderr);
                    reject(stderr);
                }
                console.log(stdout);
                resolve('Ok!');
            });
        });
    }

    runConverterWithAspectRatio (inputVideo, outputVideo, aspectRatio) {
        const outputPath = process.env.OUTPUT_PATH + Date.now() + '.' + outputVideo;
        const command = `${process.env.FFMPEG} -i ${inputVideo} -aspect ${aspectRatio} ${outputPath}`;
        return new Promise((resolve, reject) => {
            exec(command,(error, stdout, stderr) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message);
                }
                if (stderr) {
                    console.log(stderr);
                    reject(stderr);
                }
                console.log(stdout);
                resolve('Ok!');
            });
        });
    }
}